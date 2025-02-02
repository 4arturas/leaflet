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
        maxZoom: 19,
        minZoom: -30,
        zoom: 2,
    });

    const bounds = [xy(0, 0), xy(width, height)];
    const image = L.imageOverlay(imgName, bounds).addTo(map);
    // map.setView(xy(width / 2, height / 2), 0);
    // map.setView(xy(500, 800), -1.5);
    map.setView(xy(916.230, 3384.000/5), -1.7);
    return map;

}

// const imgName = 'img/req-car.png';
// const imgName = 'puml/case.svg';
// const imgName = 'puml/activity.svg';
// const imgName = 'puml/req-serreal.svg';
// const imgName = 'puml/tree-example.svg';
// const imgName = 'puml/test.svg';
const imgName = 'puml/world.svg';
const img = new Image();
img.onload = async function() {

    const map = create_Map( this.width, this.height );

    const graphJson = await load_File("/puml/graph.json");
    // Example usage:
    const graphData = extractGraphData( JSON.parse(graphJson) );

    console.log( graphData.nodes[0] );
    console.log( graphData.nodes[1] );

    for ( const node of graphData.nodes )
    {
        // L.marker(node.latlan).addTo(map);
    }

    for ( const edge of graphData.edges )
    {
        // const polylineOption = {};
        // const myPolyline = L.polyline(edge.latlan, polylineOption);
        // myPolyline.addTo(map);
    }

    const motion = L.motion.polyline([graphData.nodes[0].latlan, graphData.nodes[1].latlan], {
        color: "transparent"
    }, {
        auto: true,
        duration: 3000,
        // https://github.com/Igor-Vladyka/leaflet.motion/blob/master/src/leaflet.motion.easing.js
        easing: L.Motion.Ease.easeInOutQuart
    }, {
        removeOnEnd: true,
        showMarker: true,
        icon: L.divIcon({html: "<i class='fa fa-car fa-2x' aria-hidden='true'></i>", iconSize: L.point(27.5, 24)})
    }).addTo(map);


    setTimeout( () => {
        motion.motionPause();
    }, 1500 );


    setTimeout( () => {
        motion.motionResume();
    }, 2500 );


    L.motion.polyline([graphData.nodes[0].latlan, graphData.nodes[2].latlan], {
        color:"khaki"
    }, {
        auto: true,
        duration: 2000
    }, {
        removeOnEnd: true,
        icon: L.divIcon({html: "<i class='fa fa-plane fa-2x' aria-hidden='true'></i>", iconSize: L.point(19, 24)})
    }).addTo(map)


   /* const polylineOptions = {};
    const markerOptions = {};
    const featureGroupOtions = {};
    const instance = L.MoveMarker(
        [graphData.nodes[0].latlan, graphData.nodes[1].latlan],
        polylineOptions,
        markerOptions,
        featureGroupOtions
    )*/

}
img.src = imgName;


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