const { useEffect } = React;

// https://g2.antv.antgroup.com/examples/general/venn#venn
function DynamicVennDiagram() {
    useEffect(() => {
        if (typeof G2 === 'undefined') {
            console.error('G2 library is not loaded.');
            return;
        }

        const container = document.getElementById('dynamic-venn-diagram');
        if (!container) {
            console.error('DOM element #dynamic-venn-diagram not found.');
            return;
        }

        const chart = new G2.Chart({
            container: 'dynamic-venn-diagram',
            autoFit: true,
            padding: [20, 20, 20, 20],
        });

        chart
            .path()
            .data({
                type: 'fetch',
                value: 'https://assets.antv.antgroup.com/g2/lastfm.json',
                transform: [
                    {
                        type: 'venn', // Apply the Venn diagram transformation
                        padding: 8, // Padding between sets
                        sets: 'sets', // Specify the property for sets
                        size: 'size', // Specify the property for sizes
                        as: ['key', 'path'], // Map transformed data to 'key' and 'path'
                    },
                ],
            })
            .encode('d', 'path') // Encode the data with 'path'
            .encode('color', 'key') // Encode the color with 'key'
            .label({
                position: 'inside',
                text: (d) => d.label || '', // Display the label for each set
                transform: [{ type: 'contrastReverse' }], // Improve label contrast
            })
            .style('opacity', (d) => (d.sets.length > 1 ? 0.001 : 0.5))
            .state('inactive', { opacity: 0.2 }) // Set inactive state style
            .state('active', { opacity: 0.8 }) // Set active state style
            .interaction('elementHighlight', true) // Enable element highlight interaction
            .legend(false); // Disable legend

        chart.render();

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    return (
        <div>
            <h3>Dynamic Venn Diagram Example</h3>
            <div
                id="dynamic-venn-diagram"
                style={{
                    height: '400px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}