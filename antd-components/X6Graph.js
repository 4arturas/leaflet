// X6Graph.js
const { useEffect } = React;

// https://x6.antv.vision/en/docs/tutorial/getting-started
function X6Graph() {
    useEffect(() => {
        if (typeof X6 === 'undefined') {
            console.error('X6 library is not loaded.');
            return;
        }

        const data = {
            nodes: [
                {
                    id: 'node1',
                    shape: 'rect',
                    x: 100,
                    y: 100,
                    width: 80,
                    height: 40,
                    label: 'hello',
                },
                {
                    id: 'node2',
                    shape: 'ellipse',
                    x: 240,
                    y: 300,
                    width: 80,
                    height: 40,
                    label: 'world',
                },
            ],
            edges: [
                {
                    source: 'node1',
                    target: 'node2',
                    label: 'x6',
                    attrs: {
                        line: {
                            stroke: 'orange',
                        },
                    },
                },
            ],
        }

        const container = document.getElementById('x6-graph');
        if (!container) {
            console.error('DOM element #x6-graph not found.');
            return;
        }

        const graph = new X6.Graph({
            container: container,
            width: 800,
            height: 600,
            background: {
                color: '#fffbe6',
            },
            grid: {
                size: 10,
                visible: true,
            },
        });

        graph.fromJSON(data);
        // graph.zoom(-0.5)
        graph.translate(0, 40);
        graph.use(
            new History({
                enabled: true,
            }),
        )

        return () => {
            if (graph) {
                graph.dispose();
            }
        };
    }, []);

    return (
        <div>
            <h3>X6 Graph Example</h3>
            <div
                id="x6-graph"
                style={{
                    height: '600px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}

