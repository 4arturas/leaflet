const { useEffect } = React;

// https://g2.antv.antgroup.com/examples/interesting/interesting#timeline
function TimelineChart() {
    useEffect(() => {
        if (typeof G2 === 'undefined') {
            console.error('G2 library is not loaded.');
            return;
        }

        const data = [
            {
                year: 1788,
                composition: 'Symphony No. 41 "Jupiter"',
                composer: "Wolfgang Amadeus Mozart",
                link: "https://en.wikipedia.org/wiki/Symphony_No._41_(Mozart)",
            },
            {
                year: 1894,
                composition: "Prelude to the Afternoon of a Faun",
                composer: "Claude Debussy",
                link: "https://en.wikipedia.org/wiki/Pr%C3%A9lude_%C3%A0_l%27apr%C3%A8s-midi_d%27un_faune",
            },
            {
                year: 1805,
                composition: 'Symphony No. 3 "Eroica"',
                composer: "Ludwig van Beethoven",
                link: "https://en.wikipedia.org/wiki/Symphony_No._3_(Beethoven)",
            },
            {
                year: 1913,
                composition: "Rite of Spring",
                composer: "Igor Stravinsky",
                link: "https://en.wikipedia.org/wiki/The_Rite_of_Spring",
            },
            {
                year: 1741,
                composition: "Goldberg Variations",
                composer: "Johann Sebastian Bach",
                link: "https://en.wikipedia.org/wiki/Goldberg_Variations",
            },
            {
                year: 1881,
                composition: "Piano Concerto No. 2",
                composer: "Johannes Brahms",
                link: "https://en.wikipedia.org/wiki/Piano_Concerto_No._2_(Brahms)",
            },
            {
                year: 1826,
                composition: 'A Midsummer Night\'s Dream "Overture"',
                composer: "Felix Mendelssohn",
                link: "https://en.wikipedia.org/wiki/A_Midsummer_Night%27s_Dream_(Mendelssohn)",
            },
        ];

        const container = document.getElementById('timeline-chart');
        if (!container) {
            console.error('DOM element #timeline-chart not found.');
            return;
        }

        const chart = new G2.Chart({
            container: 'timeline-chart',
            width: 1000,
            height: 300,
            padding: [20, 60, 20, 60],
        });

        chart.options({
            type: 'view',
            interaction: { tooltip: false }, // Disable tooltips
            children: [
                {
                    type: 'line',
                    encode: { x: 'year', y: 1 },
                    style: { lineWidth: 1, stroke: '#000' },
                    axis: false, // Disable axis
                    labels: [
                        {
                            text: 'year',
                            dy: (d) => (d.year % 2 === 1 ? 8 : -4),
                            textAlign: 'center',
                            textBaseline: (d) => (d.year % 2 === 1 ? 'top' : 'bottom'),
                        },
                        {
                            text: (d) =>
                                `${d.composition} (${d.composer.slice(d.composer.lastIndexOf(' ') + 1)})`, // Label for compositions
                            dy: (d) => (d.year % 2 === 0 ? 28 : -28), // Adjust label position
                            textAlign: 'center',
                            textBaseline: (d) => (d.year % 2 === 0 ? 'top' : 'bottom'),
                            wordWrap: true, // Enable word wrapping for long labels
                            wordWrapWidth: 120, // Set maximum width for wrapped labels
                            connector: true, // Connect labels to points
                        },
                    ],
                    zIndex: 1,
                },
                {
                    type: 'point',
                    encode: { x: 'year', y: 1 },
                    style: { lineWidth: 1.5, stroke: '#000', fill: '#fff' },
                    zIndex: 1,
                },
            ],
        });

        chart.data(data);

        chart.render();

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    return (
        <div>
            <h3>Timeline Chart Example</h3>
            <div
                id="timeline-chart"
                style={{
                    height: '300px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}

export default TimelineChart;