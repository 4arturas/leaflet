async function load_Svg( svgAddress )
{
    try {
        const response = await fetch(svgAddress);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/xml");
        // console.log(doc.documentElement.nodeName);
        var all = doc.getElementsByTagName("g")[0].getElementsByTagName("*");
        const lines = new Array();
        for ( let i = 0; i < all.length; i++ )
        {
            const element = all[i];
            // console.log( element.tagName );
            if ( element.tagName === 'line' )
            {
                function create_Point( x, y )
                {
                    // return { x: parseInt(x.animVal.value), y: parseInt(y.animVal.value) };
                    return { x: (x.animVal.value), y: (y.animVal.value) };
                }
                const a = create_Point( element.x1, element.y1 );
                const b = create_Point( element.x2, element.y2 );
                lines.push( { a, b } );
            }
        } // end for i
        return lines;
    } catch (error) {
        console.error("Error fetching or parsing XML:", error);
    }
}

const yx = L.latLng;

function xy(x, y) {
    if (Array.isArray(x)) { // When doing xy([x, y]);
        return yx(x[1], x[0]);
    }
    return yx(y, x); // When doing xy(x, y);
}

function create_Map(width, height) {
    const map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: 1,
    });

    const bounds = [xy(0, 0), xy(width, height)];
    const image = L.imageOverlay(imgName, bounds).addTo(map);
    map.setView(xy(width / 2, height / 2), 0);
    return map;
}

function create_Marker( map, point, popupText = null ) {
    const coords = xy(point.x, point.y);
    const marker = L.marker(coords).addTo(map);
    if ( popupText )
        marker.bindPopup( `${popupText}` );
    return marker;
}

function create_Line( map, a, b )
{
    var pointA = new L.LatLng(a.y, a.x);
    var pointB = new L.LatLng(b.y, b.x);
    var pointList = [pointA, pointB];

    var firstpolyline = new L.Polyline(pointList, {
        color: 'red',
        weight: 3,
        // opacity: 0.5,
        smoothFactor: 1
    });
    firstpolyline.addTo(map);
}



// const imgName = 'img/req-car.png';
// const imgName = 'puml/case.svg';
const imgName = 'puml/activity.svg';
const epsImgName = 'puml/activity.tex';
const img = new Image();
img.onload = async function() {
    const lines = await load_Svg( imgName );
    const map = create_Map( this.width, this.height );

    for ( let i = 0; i < lines.length; i++ )
    {
        const line = lines[i];
        // const markerA = create_Marker( map, line.a, 'A' );
        // const markerB = create_Marker( map, line.b, 'B' );
        create_Line( map, line.a, line.b );
        // create_PointsTest( map, this.x, this.y, this.width, this.height );
    }

    const arr = lines.map( line => [line.a.y, line.a.x, 1000] );
    var heat = L.heatLayer(arr, { radius: 50 }).addTo(map);
    /*var heat = L.heatLayer([
            [lines[0].a.y, lines[0].a.x, 1000],
            [lines[0].b.y, lines[0].b.x, 1000],
            [lines[1].a.y, lines[1].a.x, 1000],
            [lines[1].b.y, lines[1].b.x, 1000],
            // [4022, 700, 2500], // lat, lng, intensity
        ], { radius: 50 })
        .addTo(map)
    ;*/
    map.addLayer(heat);
}
img.src = imgName;



function create_Animation()
{
    // here is the path (get it from where you want)
    // var coordinateArray = [ xy(711,4022), xy(711,4010), xy(700,4022) ];
    // or for example
    var coordinateArray = travel.getLatLngs();
    // here is the line you draw (if you want to see the animated marker path on the map)
    var myPolyline = L.polyline(coordinateArray, polylineOption);
    myPolyline.addTo(map);
    // i don't know if i understood your question correctly
    // if you want to put a marker at the beginning and at the end of the path :
    var mstart = L.marker(coordinateArray[0]).addTo(map);
    var mend = L.marker(coordinateArray[coordinateArray.length - 1]).addTo(map);
    // here is the moving marker (6 seconds animation)
    var myMovingMarker = L.Marker.movingMarker(coordinateArray, 60000, {
        autostart: false
    });
    map.addLayer(myMovingMarker);
    myMovingMarker.start();
}