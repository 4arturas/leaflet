const { useEffect } = React;

// https://g.antv.antgroup.com/en/guide/getting-started#cdn
function GCanvasCircle() {
    useEffect(() => {
        if (typeof window.G === 'undefined') {
            console.error('G or G-Canvas library is not loaded.');
            return;
        }

        const { Circle, Canvas, CanvasEvent } = window.G;

        const canvasRenderer = new window.G.Canvas2D.Renderer();

        const container = document.getElementById('g-canvas-circle');
        if (!container) {
            console.error('DOM element #g-canvas-circle not found.');
            return;
        }

        const canvas = new Canvas({
            container: 'g-canvas-circle',
            width: 600,
            height: 500,
            renderer: canvasRenderer,
        });

        const circle = new Circle({
            style: {
                r: 50, // Radius of the circle
                fill: '#1890FF',
                stroke: '#F04864',
                lineWidth: 4,
                cursor: 'pointer',
            },
        });
        circle.setPosition(100, 100);

        canvas.addEventListener(CanvasEvent.READY, () => {
            canvas.appendChild(circle);

            circle.addEventListener('click', () => {
                alert('Circle clicked!');
            });
        });

        return () => {
            if (canvas) {
                canvas.destroy();
            }
        };
    }, []);

    return (
        <div>
            <h3>G Canvas Circle Example</h3>
            <div
                id="g-canvas-circle"
                style={{
                    height: '500px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}