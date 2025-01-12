function convert_SvgPoint( x, y, width, height )
{
    return { x: x, y: -(y-height) };
}
function convert_SvgLines( lines, width, height )
{
    return lines.map( (l) => (
        {
            a: convert_SvgPoint( l.a.x, l.a.y, width, height ),
            b: convert_SvgPoint( l.b.x, l.b.y, width, height )
        }
    ));
}

function convert_SvgTexts( texts, width, height )
{
    return texts.map( t => (
        {
            ...t,
            ...convert_SvgPoint( t.x, t.y, width, height )
        }
    ) );
}

const yx = L.latLng;

function xy(x, y) {
    if (Array.isArray(x)) { // When doing xy([x, y]);
        return yx(x[1], x[0]);
    }
    return yx(y, x); // When doing xy(x, y);
}

async function load_Svg( svgAddress )
{
    try {
        const response = await fetch(svgAddress);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/xml");
        // console.log(doc.documentElement.nodeName);
        const all = doc.getElementsByTagName("g")[0].getElementsByTagName("*");
        const lines = new Array();
        const texts = new Array();
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
            else if ( element.tagName === 'text' )
            {
                texts.push( { x: element.x.animVal[0].value, y: element.y.animVal[0].value, text: element.innerHTML.trim() } )
            }
        } // end for i
        return { lines, texts };
    } catch (error) {
        console.error("Error fetching or parsing XML:", error);
    }
}

function create_Map(width, height) {
    const map = L.map('map', {
        crs: L.CRS.Simple,
        maxZoom: 19,
        minZoom: -20,
        zoom: 20,
    });

    const bounds = [xy(0, 0), xy(width, height)];
    const image = L.imageOverlay(imgName, bounds).addTo(map);
    // map.setView(xy(width / 2, height / 2), 0);
    map.setView(xy(100, 100), 1);
    return map;
}

function create_Line( map, a, b, color = 'red' )
{
    const pointA = new L.LatLng(a.y, a.x);
    const pointB = new L.LatLng(b.y, b.x);

    const pointList = [pointB, pointA];

    const polyline = new L.Polyline(pointList, {
        color: color,
        weight: 3,
        // opacity: 0.5,
        smoothFactor: 1
    });
    polyline.addTo(map);
    return polyline;
}

function draw_HeatMap( map, lines )
{
    const arr = lines.map( line => [line.a.y, line.a.x, 1000] );
    const heat = L.heatLayer(arr, { radius: 10 }).addTo(map);
    map.addLayer(heat);
}

function draw_Lines( map, lines )
{
    for ( let i = 0; i < lines.length; i++ )
    {
        const line = lines[i];
        create_Line( map, line.a, line.b );
    }
}

function extract_Points( lines, texts )
{
    const pointsLines = [];
    lines.forEach( l => {
       pointsLines.push( { x: l.a.x, y: l.a.y } );
       pointsLines.push( { x: l.b.x, y: l.b.y } );
    });
    const pointsText = texts.map( text => ({ x: text.x, y: text.y }) );
    const points = [...pointsLines, ...pointsText ]
        .sort( (a,b)=> { return b.y - a.y; });
    return points;
}

// const imgName = 'img/req-car.png';
// const imgName = 'puml/case.svg';
// const imgName = 'puml/activity.svg';
// const imgName = 'puml/req-serreal.svg';
const imgName = 'puml/tree-example.svg';
const img = new Image();
img.onload = async function() {
    let { lines, texts } = await load_Svg( imgName );
    lines = convert_SvgLines( lines, img.width, img.height );
    texts = convert_SvgTexts( texts, img.width, img.height );
    const map = create_Map( this.width, this.height );

    draw_Lines( map, lines );

    const points = extract_Points( lines, texts );

    const sortedTexts = test_PQ( texts );
    // console.log( sortedTexts );
    const pointFrom = {x: sortedTexts[0].x, y: sortedTexts[0].y };
    const pointTo = {x: sortedTexts[texts.length-1].x, y: sortedTexts[texts.length-1].y };
    // const lineBetweenCountries = create_Line( map, pointFrom, pointTo, 'green' );
    const path = [[pointFrom.y, pointFrom.x], [pointTo.y, pointTo.x]];
    create_Animation( map, path, 1000 );
    draw_HeatMap( map, lines );

    as_FindShortestPath( points, points[0], points[10] );
}
img.src = imgName;

function test_PQ(texts)
{
    var size = texts.length;
    var pq = pq_Create(size);
    pq.fnHeur = function ( e0, e1 )
    {
        return e0.y < e1.y;
    }
    pq.fnEqual = function ( e0, e1 )
    {
        return e0.x === e1.x && e0.y === e1.y;
    }
    for ( let i = 0; i < size; i++)
    {
        const text = texts[i];
        pq_Enqueue(pq, text);
    } // end for i

    const sortedTexts = [];
    while (pq.count !== 0)
    {
        e = pq.arr[1];
        sortedTexts.push( e );
        pq_Dequeue(pq, 1);
    } // end while
    return sortedTexts;
}

function create_Animation( map, coordinateArray, speed = 500, drawPolyline = false )
{
    if ( drawPolyline )
    {
        const polylineOption = {};
        var myPolyline = L.polyline(coordinateArray, polylineOption);
        myPolyline.addTo(map);
    }

    // var mstart = L.marker([a.y, a.x]).addTo(map);
    // var mend = L.marker([b.y, b.x]).addTo(map);
    // here is the moving marker (6 seconds animation)
    var myMovingMarker = L.Marker.movingMarker(coordinateArray, speed, {
        autostart: false
    });
    map.addLayer(myMovingMarker);
    myMovingMarker.start();
}


function create_Animation2()
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