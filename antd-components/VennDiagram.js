const { useEffect } = React;

// https://g2.antv.antgroup.com/examples/general/venn#venn-hollow
function VennDiagram() {
    useEffect(() => {
        if (typeof G2 === 'undefined') {
            console.error('G2 library is not loaded.');
            return;
        }

        const container = document.getElementById('venn-diagram');
        if (!container) {
            console.error('DOM element #venn-diagram not found.');
            return;
        }

        const chart = new G2.Chart({
            container: 'venn-diagram',
            autoFit: true,
            padding: [20, 20, 20, 20],
        });

        const data = {
            type: 'inline',
            value: [
                { sets: ['A'], size: 15, label: 'A' },
                { sets: ['B'], size: 12, label: 'B' },
                { sets: ['C'], size: 10, label: 'C' },
                { sets: ['A', 'B'], size: 2, label: 'A&B' },
                { sets: ['A', 'C'], size: 2, label: 'A&C' },
                { sets: ['B', 'C'], size: 1, label: 'B&C' },
                { sets: ['A', 'B', 'C'], size: 1 },
            ],
            transform: [
                {
                    type: 'venn',
                },
            ],
        };

        chart
            .path()
            .data(data)
            .encode('d', 'path') // Encode the data with 'path'
            .encode('color', 'key') // Encode the color with 'key'
            .encode('shape', 'hollow') // Use hollow shapes for the sets
            .label({
                position: 'inside', // Place labels inside the sets
                text: (d) => d.label || '', // Display the label for each set
                fill: '#000', // Set label text color to black
            })
            .style('opacity', 0.6) // Set the opacity of the sets
            .style('lineWidth', 8) // Set the line width of the sets
            .tooltip(false); // Disable tooltips

        chart.render();

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    return (
        <div>
            <h3>Venn Diagram Example</h3>
            <div
                id="venn-diagram"
                style={{
                    height: '400px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}

