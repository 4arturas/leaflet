// HeatMap.js
const { useEffect } = React;

function HeatMap() {
    useEffect(() => {
        // Ensure ECharts is loaded
        if (typeof echarts === 'undefined') {
            console.error('ECharts library is not loaded.');
            return;
        }

        // Initialize the chart
        const chartDom = document.getElementById('heatmap');
        const myChart = echarts.init(chartDom);

        // Generate mock data for the heatmap
        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
        const data = [];
        for (let dayIndex = 0; dayIndex < daysOfWeek.length; dayIndex++) {
            for (let hourIndex = 0; hourIndex < hours.length; hourIndex++) {
                const value = Math.floor(Math.random() * 100); // Random value between 0 and 99
                data.push([dayIndex, hourIndex, value]);
            }
        }

        // Chart configuration
        const option = {
            title: {
                text: 'Heatmap Example',
                left: 'center',
            },
            tooltip: {
                position: 'top',
            },
            xAxis: {
                type: 'category',
                data: daysOfWeek,
                splitArea: {
                    show: true,
                },
            },
            yAxis: {
                type: 'category',
                data: hours,
                splitArea: {
                    show: true,
                },
            },
            visualMap: {
                min: 0,
                max: 100,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: 10,
            },
            series: [
                {
                    name: 'Heatmap',
                    type: 'heatmap',
                    data: data,
                    label: {
                        show: false,
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        };

        // Set the chart options
        myChart.setOption(option);

        // Resize the chart on window resize
        window.addEventListener('resize', () => myChart.resize());

        // Clean up the chart when the component unmounts
        return () => {
            window.removeEventListener('resize', () => myChart.resize());
            myChart.dispose();
        };
    }, []);

    return (
        <div>
            <h3>Heatmap Example</h3>
            <div
                id="heatmap"
                style={{
                    height: '600px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}