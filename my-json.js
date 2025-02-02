async function load_File( fileAddress )
{
    try {
        const response = await fetch(fileAddress);
        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Error fetching or parsing XML:", error);
    }
}

function extractGraphData(graphJson)
{
    const data = {
        nodes: [],
        edges: []
    };

    // Extract nodes
    // const shiftX = 15;
    // const shiftY = 220;
    const shiftX = 0;
    const shiftY = 0;
    graphJson.objects.forEach(node => {
        const nodeData = {
            id: node.name,
            x: parseFloat(node.pos.split(',')[0])*1.33,
            y: parseFloat(node.pos.split(',')[1])*1.33,
            latlan: [parseFloat(node.pos.split(',')[1])*1.33, parseFloat(node.pos.split(',')[0])*1.33],
            label: node.label,
            width: parseFloat(node.width),
            height: parseFloat(node.height)
        };
        data.nodes.push(nodeData);
    });

    // Extract edges
    graphJson.edges.forEach(edge => {
        const sourceNode = graphJson.objects[edge.tail].name;
        const targetNode = graphJson.objects[edge.head].name;
        const pathCoordinates = edge._draw_[1].points.map(point => ({
            x: point[0],
            y: point[1]
        }));

        const mulY = 1.34;
        const mulX = 1.37;
        const latlan = edge._draw_[1].points.map(point => ([
            point[1]*mulY, point[0]*mulX
        ]));
console.log( latlan );
        const edgeData = {
            source: sourceNode,
            target: targetNode,
            path: pathCoordinates,
            latlan:latlan
        };
        data.edges.push(edgeData);
    });

    return data;
}

