const { useEffect } = React;

function StackedAreaChart() {
    useEffect(() => {
        if (typeof G2 === 'undefined') {
            console.error('G2 library is not loaded.');
            return;
        }

        const container = document.getElementById('stacked-area-chart');
        if (!container) {
            console.error('DOM element #stacked-area-chart not found.');
            return;
        }

        const chart = new G2.Chart({
            container: 'stacked-area-chart',
            autoFit: true, // Automatically adjust the chart size to fit the container
            padding: [20, 40, 60, 40], // Add padding around the chart
        });

        chart.data({
            type: 'fetch', // Fetch data from a remote URL
            value: 'https://gw.alipayobjects.com/os/bmw-prod/f38a8ad0-6e1f-4bb3-894c-7db50781fdec.json',
            onError: (error) => {
                console.error('Error fetching stacked area chart data:', error);
            },
        });

        chart
            .area()
            .transform({ type: 'stackY', orderBy: 'maxIndex', reverse: true }) // Stack the y-axis values
            .encode('x', (d) => new Date(d.year)) // Encode x-axis with 'year' as Date
            .encode('y', 'revenue') // Encode y-axis with 'revenue'
            .encode('series', 'format') // Group by 'format'
            .encode('color', 'group') // Assign colors based on 'group'
            .encode('shape', 'smooth') // Use smooth shapes for areas
            .axis('y', { labelFormatter: '~s' }) // Format y-axis labels
            .tooltip({ channel: 'y', valueFormatter: '.2f' }); // Show tooltips with two decimal places

        // Add lines on top of the areas
        chart
            .line()
            .transform({
                type: 'stackY',
                orderBy: 'maxIndex',
                reverse: true,
                y: 'y1', // Use 'y1' for line stacking
            })
            .encode('x', (d) => new Date(d.year)) // Encode x-axis with 'year' as Date
            .encode('y', 'revenue') // Encode y-axis with 'revenue'
            .encode('series', 'format') // Group by 'format'
            .encode('shape', 'smooth') // Use smooth shapes for lines
            .encode('color', 'group') // Assign colors based on 'group' (for legend filtering)
            .style('stroke', 'white') // Set line stroke color to white
            .tooltip(false); // Disable tooltips for lines

        // Add interaction to filter tooltips based on positive revenue
        chart.interaction('tooltip', {
            filter: (d) => parseInt(d.value) > 0, // Show tooltips only for positive revenue values
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
            <h3>Stacked Area Chart Example</h3>
            <div
                id="stacked-area-chart"
                style={{
                    height: '500px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}