// G2Chart.js
const { useEffect } = React;
// https://g2.antv.antgroup.com/examples
function G2Chart() {
    useEffect(() => {
        // Ensure G2 is loaded
        if (typeof G2 === 'undefined') {
            console.error('G2 library is not loaded.');
            return;
        }

        const data = [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
        ];

        const container = document.getElementById('g2-chart');
        if (!container) {
            console.error('DOM element #g2-chart not found.');
            return;
        }

        const chart = new G2.Chart({
            container: 'g2-chart',
            width: 800,
            height: 400,
        });

        chart
            .interval() // Create an interval geometry (bar chart)
            .data(data) // Bind the data
            .encode('x', 'genre') // Encode the x-axis with 'genre'
            .encode('y', 'sold') // Encode the y-axis with 'sold'
            .encode('color', 'genre'); // Add color encoding for better visualization

        chart.render();

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    return (
        <div>
            <h3>G2 Chart Example</h3>
            <div
                id="g2-chart"
                style={{
                    height: '400px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}