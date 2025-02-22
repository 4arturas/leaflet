const { useEffect } = React;

function G6Graph() {
    useEffect(() => {
        if (typeof G6 === 'undefined') {
            console.error('G6 library is not loaded.');
            return;
        }

        const data = {
            nodes: [
                { id: 'node1', x: 100, y: 200, label: 'Node 1' },
                { id: 'node2', x: 300, y: 200, label: 'Node 2' },
                { id: 'node3', x: 200, y: 400, label: 'Node 3' },
            ],
            edges: [
                { source: 'node1', target: 'node2', label: 'Edge 1-2' },
                { source: 'node2', target: 'node3', label: 'Edge 2-3' },
                { source: 'node1', target: 'node3', label: 'Edge 1-3' },
            ],
        };

        const container = document.getElementById('g6-graph');
        if (!container) {
            console.error('DOM element #g6-graph not found.');
            return;
        }

        const graph = new G6.Graph({
            container: 'g6-graph',
            width: 1000,
            height: 1000,
            renderer: 'svg',
            fitView: true,
            fitViewPadding: [ 20, 40, 50, 20 ]
        });

        graph.data(data);
        graph.render();

        /*const main = async () => {
            const response = await fetch('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json');
            const remoteData = await response.json();
            graph.data(remoteData);
            graph.render();
        };
        main();*/

        return () => {
            if (graph) {
                graph.destroy();
            }
        };
    }, []);

    return (
        <div>
            <h3>G6 Graph Example</h3>
            <div
                id="g6-graph"
                style={{
                    // height: '500px',
                    // width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}

