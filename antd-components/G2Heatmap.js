const { useEffect, useState } = React;

// Custom throttle function (replaces Lodash's throttle)
function throttle(func, delay) {
    let lastCall = 0;
    let timeoutId = null;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastCall = now;
                func.apply(this, args);
            }, delay - (now - lastCall));
        } else {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// https://g2.antv.antgroup.com/examples/general/heatmap#mouse-heatmap
// https://g2.antv.antgroup.com/examples/general/heatmap#heatmap
function G2Heatmap() {
    const [dataMap, setDataMap] = useState({}); // State to store heatmap data

    useEffect(() => {
        if (typeof G2 === 'undefined') {
            console.error('G2 library is not loaded.');
            return;
        }

        const initialData = [
            { x: "88", y: "264", v: 1 },
            { x: "88", y: "280", v: 1 },
            { x: "96", y: "232", v: 1 },
            { x: "96", y: "312", v: 1 },
            { x: "96", y: "320", v: 1 },
            { x: "104", y: "224", v: 1 },
            { x: "112", y: "208", v: 1 },
            { x: "120", y: "192", v: 1 },
            { x: "120", y: "336", v: 1 },
            { x: "120", y: "344", v: 1 },
            { x: "128", y: "184", v: 1 },
            { x: "136", y: "176", v: 1 },
            { x: "152", y: "352", v: 1 },
            { x: "160", y: "152", v: 1 },
            { x: "168", y: "152", v: 1 },
            { x: "168", y: "360", v: 1 },
            { x: "176", y: "152", v: 2 },
            { x: "184", y: "368", v: 1 },
            { x: "200", y: "144", v: 1 },
            { x: "208", y: "368", v: 1 },
            { x: "216", y: "352", v: 1 },
            { x: "224", y: "136", v: 1 },
            { x: "224", y: "368", v: 1 },
            { x: "224", y: "376", v: 1 },
            { x: "232", y: "328", v: 1 },
            { x: "232", y: "376", v: 1 },
            { x: "232", y: "384", v: 1 },
            { x: "240", y: "376", v: 1 },
            { x: "248", y: "152", v: 1 },
            { x: "248", y: "160", v: 1 },
            { x: "248", y: "184", v: 1 },
            { x: "248", y: "200", v: 1 },
            { x: "256", y: "144", v: 1 },
            { x: "256", y: "312", v: 1 },
            { x: "256", y: "384", v: 1 },
            { x: "264", y: "144", v: 1 },
            { x: "272", y: "136", v: 3 },
            { x: "272", y: "224", v: 2 },
            { x: "272", y: "384", v: 1 },
            { x: "280", y: "136", v: 1 },
            { x: "280", y: "384", v: 1 },
            { x: "288", y: "256", v: 1 },
            { x: "296", y: "136", v: 2 },
            { x: "296", y: "232", v: 1 },
            { x: "296", y: "256", v: 8 },
            { x: "296", y: "376", v: 1 },
            { x: "304", y: "240", v: 1 },
            { x: "304", y: "256", v: 1 },
            { x: "304", y: "384", v: 1 },
            { x: "312", y: "240", v: 1 },
            { x: "320", y: "128", v: 1 },
            { x: "328", y: "128", v: 1 },
            { x: "328", y: "232", v: 1 },
            { x: "328", y: "248", v: 2 },
            { x: "328", y: "376", v: 1 },
            { x: "336", y: "248", v: 1 },
            { x: "336", y: "368", v: 1 },
            { x: "344", y: "248", v: 1 },
            { x: "344", y: "304", v: 1 },
            { x: "344", y: "368", v: 1 },
            { x: "352", y: "128", v: 1 },
            { x: "352", y: "224", v: 1 },
            { x: "352", y: "240", v: 1 },
            { x: "360", y: "128", v: 1 },
            { x: "360", y: "136", v: 1 },
            { x: "360", y: "360", v: 2 },
            { x: "368", y: "240", v: 1 },
            { x: "368", y: "352", v: 2 },
            { x: "376", y: "144", v: 1 },
            { x: "376", y: "256", v: 1 },
            { x: "376", y: "352", v: 1 },
            { x: "384", y: "128", v: 1 },
            { x: "384", y: "224", v: 1 },
            { x: "384", y: "232", v: 1 },
            { x: "384", y: "256", v: 1 },
            { x: "384", y: "368", v: 1 },
            { x: "392", y: "344", v: 1 },
            { x: "400", y: "128", v: 1 },
            { x: "400", y: "216", v: 1 },
            { x: "400", y: "224", v: 1 },
            { x: "400", y: "264", v: 1 },
            { x: "408", y: "152", v: 1 },
            { x: "408", y: "264", v: 1 },
            { x: "408", y: "336", v: 1 },
            { x: "408", y: "360", v: 1 },
            { x: "416", y: "208", v: 1 },
            { x: "416", y: "272", v: 2 },
            { x: "416", y: "288", v: 1 },
            { x: "416", y: "296", v: 1 },
            { x: "416", y: "320", v: 2 },
            { x: "416", y: "328", v: 2 },
            { x: "416", y: "336", v: 5 },
            { x: "424", y: "152", v: 1 },
            { x: "432", y: "128", v: 1 },
            { x: "432", y: "200", v: 1 },
            { x: "432", y: "216", v: 1 },
            { x: "440", y: "168", v: 1 },
            { x: "440", y: "192", v: 1 },
            { x: "440", y: "352", v: 1 },
            { x: "448", y: "136", v: 1 },
            { x: "448", y: "176", v: 1 },
            { x: "448", y: "312", v: 1 },
            { x: "456", y: "184", v: 1 },
            { x: "456", y: "208", v: 1 },
            { x: "456", y: "216", v: 1 },
            { x: "456", y: "344", v: 1 },
            { x: "464", y: "224", v: 1 },
            { x: "472", y: "136", v: 1 },
            { x: "472", y: "168", v: 1 },
            { x: "472", y: "240", v: 1 },
            { x: "472", y: "248", v: 1 },
            { x: "480", y: "160", v: 1 },
            { x: "480", y: "280", v: 1 },
            { x: "480", y: "288", v: 1 },
            { x: "480", y: "304", v: 1 },
            { x: "480", y: "320", v: 1 },
            { x: "488", y: "304", v: 1 },
            { x: "488", y: "312", v: 1 },
            { x: "496", y: "152", v: 1 },
            { x: "504", y: "136", v: 1 },
            { x: "504", y: "144", v: 1 },
            { x: "512", y: "136", v: 3 },
            { x: "520", y: "200", v: 1 },
            { x: "616", y: "160", v: 1 },
            { x: "624", y: "320", v: 1 },
        ];

        const container = document.getElementById('g2-heatmap');
        if (!container) {
            console.error('DOM element #g2-heatmap not found.');
            return;
        }

        const chart = new G2.Chart({
            container: 'g2-heatmap',
            width: 640,
            height: 480,
            padding: 0,
        });

        chart.style({
            viewFill: '#4e79a7', // Background color
        });

        chart.axis(false);

        chart
            .heatmap()
            .encode('x', 'x')
            .encode('y', 'y')
            .encode('color', 'v')
            .scale('x', { domain: [0, 640] })
            .scale('y', { domain: [0, 480], range: [0, 1] })
            .style('opacity', 0)
            .tooltip(false)
            .animate(false);

        chart.data(initialData);
        chart.render();

        const handlePointerMove = throttle((e) => {
            const { x, y } = e; // Get mouse coordinates
            const kx = Math.floor(x - (x % 8)); // Snap x to grid (8px)
            const ky = Math.floor(y - (y % 8)); // Snap y to grid (8px)

            let updatedDataMap = { ...dataMap };
            if (!updatedDataMap[kx]) updatedDataMap[kx] = {};
            if (!updatedDataMap[kx][ky]) updatedDataMap[kx][ky] = 0;
            updatedDataMap[kx][ky] += 1;

            const transformedData = transform(updatedDataMap);

            chart.changeData(transformedData);
        }, 50);

        chart.on('plot:pointermove', handlePointerMove);

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    function transform(dataMap) {
        const arr = [];
        Object.keys(dataMap).forEach((x) => {
            Object.keys(dataMap[x]).forEach((y) => {
                arr.push({ x, y, v: dataMap[x][y] });
            });
        });
        return arr;
    }

    return (
        <div>
            <h3>G2 Heatmap Example</h3>
            <div
                id="g2-heatmap"
                style={{
                    height: '480px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}