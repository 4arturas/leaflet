const { useEffect } = React;

function BarChart() {
    useEffect(() => {
        if (typeof echarts === 'undefined') {
            console.error('ECharts library is not loaded.');
            return;
        }

        const chartDom = document.getElementById('bar-chart');
        const myChart = echarts.init(chartDom);

        const option = {
            title: {
                text: 'Bar Chart Example',
                left: 'center',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)',
                    },
                },
            ],
        };

        // Set the chart options
        myChart.setOption(option);

        window.addEventListener('resize', () => myChart.resize());

        return () => {
            window.removeEventListener('resize', () => myChart.resize());
            myChart.dispose();
        };
    }, []);

    return (
        <div>
            <h3>Bar Chart Example</h3>
            <div
                id="bar-chart"
                style={{
                    height: '400px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}