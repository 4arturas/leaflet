const { useEffect } = React;
const { Button } = antd;

function G6Crime() {
    const [acolor, setAcolor] = React.useState('lightblue');
    const [bcolor, setBcolor] = React.useState('green');
    const [ccolor, setCcolor] = React.useState('red');

    const [data, setData] = React.useState({
        nodes: [
            { id: 'A', x: 100, y: 200, label: 'A', style: { fill: acolor } },
            { id: 'B', x: 200, y: 400, label: 'B', style: { fill: bcolor } },
            { id: 'C', x: 300, y: 200, label: 'C', style: { fill: ccolor } },
        ],
        edges: [
            { source: 'A', target: 'B', label: 'A-B' },
            { source: 'B', target: 'C', label: 'B-C' },
            { source: 'A', target: 'C', label: 'A-C' },
        ],
    });

    const [graph, setGraph] = React.useState(null);

    useEffect(() => {
        // Ensure G6 is loaded
        if (typeof G6 === 'undefined') {
            console.error('G6 library is not loaded.');
            return;
        }

        const container = document.getElementById('g6-crime-graph');
        if (!container) {
            console.error('DOM element #g6-crime-graph not found.');
            return;
        }

        const minimap = new G6.Minimap({
            size: [100, 100],
            className: 'minimap',
            type: 'delegate',
        });
        const grid = new G6.Grid();

        const tmpGraph = new G6.Graph({
            container: 'g6-crime-graph',
            width: 1000,
            height: 1000,
            renderer: 'svg',
            fitView: true,
            fitViewPadding: [20, 40, 50, 20],
            defaultNode: {
                size: 20, // Node size
                style: {
                    lineWidth: 2, // Node border width
                    stroke: '#5B8FF9', // Node border color
                },
                labelCfg: {
                    position: 'center', // Center-align node labels
                    style: {
                        fill: '#000', // Label text color
                        fontSize: 14, // Label font size
                    },
                },
            },
            defaultEdge: {
                shape: 'cubic',
                size: 1,
                autoRotate: true,
                style: {
                    lineAppendWidth: 10,
                },
                labelCfg: {
                    position: 'center',
                    autoRotate: true,
                    refY: -10,
                    refX: 60,
                    style: {
                        stroke: 'white',
                        lineWidth: 2,
                        fill: 'black',
                    },
                },
            },
            modes: {
                default: ['drag-node', 'zoom-canvas'],
            },
            plugins: [grid],
        });

        setGraph(tmpGraph);

        tmpGraph.data(data);
        tmpGraph.render();

        return () => {
            if (tmpGraph) {
                tmpGraph.destroy();
            }
        };
    }, []);

    const handleAIsThief = () => {
        const na = data.nodes[0];
        const nb = data.nodes[1];
        const nc = data.nodes[2];

        const eb = { source: nb.id, target: na.id, style: { stroke: bcolor }, label: 'A is a thief' };
        const ec1 = { source: nc.id, target: na.id, style: { stroke: ccolor }, label: 'A is a thief' };
        const ec2 = { source: nc.id, target: nb.id, style: { stroke: ccolor, opacity: 0.1 }, label: 'B is a thief' };

        setData((prevData) => ({
            ...prevData,
            edges: [eb, ec1, ec2],
        }));

        if (graph) {
            graph.data({ ...data, edges: [eb, ec1, ec2] });
            graph.render();
        }
    };

    const handleBIsThief = () => {
        const na = data.nodes[0];
        const nb = data.nodes[1];
        const nc = data.nodes[2];

        const ea1 = { source: na.id, target: nb.id, style: { stroke: acolor }, label: 'B is a thief' };
        const ea2 = { source: na.id, target: nc.id, style: { stroke: acolor }, label: 'C is a thief' };
        const ec1 = { source: nc.id, target: na.id, style: { stroke: ccolor }, label: 'A is a thief' };
        const ec2 = { source: nc.id, target: nb.id, style: { stroke: ccolor }, label: 'B is a thief' };

        setData((prevData) => ({
            ...prevData,
            edges: [ea1, ea2, ec1, ec2],
        }));

        if (graph) {
            graph.data({ ...data, edges: [ea1, ea2, ec1, ec2] });
            graph.render();
        }
    };

    return (
        <div>
            <h3>Graph Crime Example</h3>
            <table>
                <tbody>
                <tr>
                    <td>Condition - Only one person is telling the truth</td>
                    <td>-></td>
                    <td><b>A</b> - I'm not the thief</td>
                    <td><b>B</b> - A is the thief</td>
                    <td><b>C</b> - I'm not the thief</td>
                    <td>
                        <Button onClick={handleAIsThief}>
                            A is a thief
                        </Button>
                    </td>
                    <td>
                        <Button onClick={handleBIsThief}>
                            B is a thief
                        </Button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div
                id="g6-crime-graph"
                style={{
                    height: '1000px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}