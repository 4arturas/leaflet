const { useEffect } = React;

// https://g2.antv.antgroup.com/examples/analysis/group#bar-stacked-normalized-1d
function StackedBarChart() {
    useEffect(() => {
        if (typeof G2 === 'undefined') {
            console.error('G2 library is not loaded.');
            return;
        }

        const container = document.getElementById('stacked-bar-chart');
        if (!container) {
            console.error('DOM element #stacked-bar-chart not found.');
            return;
        }

        const chart = new G2.Chart({
            container: 'stacked-bar-chart',
            height: 200,
            padding: [20, 40, 60, 40],
        });

        chart.coordinate({ transform: [{ type: 'transpose' }] }); // Transpose the x and y axes

        chart
            .interval()
            .data({
                type: 'fetch', // Fetch data from a remote URL
                value: 'https://assets.antv.antgroup.com/g2/penguins.json',
            })
            .transform({ type: 'groupColor', y: 'count' }) // Group colors by 'count'
            .transform({ type: 'stackY' }) // Stack the y-axis values
            .transform({ type: 'normalizeY' }) // Normalize the y-axis values to percentages
            .axis('y', { labelFormatter: '.0%' }) // Format y-axis labels as percentages
            .encode('color', 'sex') // Encode color with 'sex'
            .label({
                text: 'sex', // Display labels for 'sex'
                position: 'inside', // Place labels inside the bars
            })
            .tooltip({
                channel: 'y', // Show tooltips for the y-axis
                valueFormatter: '.0%', // Format tooltip values as percentages
            });

        chart.render();

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    return (
        <div>
            <h3>Stacked Bar Chart Example</h3>
            <div
                id="stacked-bar-chart"
                style={{
                    height: '400px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}