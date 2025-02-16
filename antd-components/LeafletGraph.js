// LeafletGraph.js
const { useEffect } = React;

function LeafletGraph() {
    useEffect(() => {
        if (typeof L === 'undefined') {
            console.error('Leaflet library is not loaded.');
            return;
        }

        // Initialize the map
        const imgName = 'puml/world.svg';
        const img = new Image();

        img.onload = async function () {
            const map = L.map('map', {
                crs: L.CRS.Simple,
                maxZoom: 19,
                minZoom: -30,
                zoom: 2,
            });

            const bounds = [xy(0, 0), xy(this.width, this.height)];
            L.imageOverlay(imgName, bounds).addTo(map);
            map.setView(xy(916.230, 3384.0 / 5), -1.7);

            // Load graph data
            const graphJson = await load_File('/puml/graph.json');
            const graphData = extractGraphData(JSON.parse(graphJson));

            // Add nodes as markers
            for (const node of graphData.nodes) {
                L.marker(node.latlan).addTo(map);
            }

            // Add edges as polylines
            for (const edge of graphData.edges) {
                L.polyline(edge.latlan, { color: 'blue' }).addTo(map);
            }

            // Add motion animation
            const motion = L.motion.polyline(
                [graphData.nodes[0].latlan, graphData.nodes[1].latlan],
                { color: 'transparent' },
                {
                    auto: true,
                    duration: 3000,
                    easing: L.Motion.Ease.easeInOutQuart,
                },
                {
                    removeOnEnd: true,
                    showMarker: true,
                    icon: L.divIcon({
                        html: "<i class='fa fa-car fa-2x' aria-hidden='true'></i>",
                        iconSize: L.point(27.5, 24),
                    }),
                }
            ).addTo(map);

            setTimeout(() => {
                motion.motionPause();
            }, 1500);

            setTimeout(() => {
                motion.motionResume();
            }, 2500);

            // Add another motion animation
            L.motion.polyline(
                [graphData.nodes[0].latlan, graphData.nodes[2].latlan],
                { color: 'khaki' },
                {
                    auto: true,
                    duration: 2000,
                },
                {
                    removeOnEnd: true,
                    icon: L.divIcon({
                        html: "<i class='fa fa-plane fa-2x' aria-hidden='true'></i>",
                        iconSize: L.point(19, 24),
                    }),
                }
            ).addTo(map);
        };

        img.src = imgName;

        // Helper functions
        function xy(x, y) {
            if (Array.isArray(x)) {
                return L.latLng(x[1], x[0]);
            }
            return L.latLng(y, x);
        }

        async function load_File(fileAddress) {
            try {
                const response = await fetch(fileAddress);
                const text = await response.text();
                return text;
            } catch (error) {
                console.error('Error fetching or parsing JSON:', error);
            }
        }

        function extractGraphData(graphJson) {
            const data = {
                nodes: [],
                edges: [],
            };

            graphJson.objects.forEach((node) => {
                const nodeData = {
                    id: node.name,
                    x: parseFloat(node.pos.split(',')[0]) * 1.33,
                    y: parseFloat(node.pos.split(',')[1]) * 1.33,
                    latlan: [parseFloat(node.pos.split(',')[1]) * 1.33, parseFloat(node.pos.split(',')[0]) * 1.33],
                    label: node.label,
                    width: parseFloat(node.width),
                    height: parseFloat(node.height),
                };
                data.nodes.push(nodeData);
            });

            graphJson.edges.forEach((edge) => {
                const sourceNode = graphJson.objects[edge.tail].name;
                const targetNode = graphJson.objects[edge.head].name;
                const pathCoordinates = edge._draw_[1].points.map((point) => [point[1] * 1.34, point[0] * 1.37]);
                const edgeData = {
                    source: sourceNode,
                    target: targetNode,
                    latlan: pathCoordinates,
                };
                data.edges.push(edgeData);
            });

            return data;
        }

        // Clean up the map when the component unmounts
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    return (
        <div>
            <h3>Leaflet Graph Example</h3>
            <div
                id="map"
                style={{
                    height: '600px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}
