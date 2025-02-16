const { useEffect } = React;
const { Button } = antd;

let map;

function LeafletMap() {
    useEffect(() => {
        if (typeof L === 'undefined') {
            console.error('Leaflet library is not loaded.');
            return;
        }

        map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);



        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    setTimeout( () => {
        // A marker can be added from here as well
    }, 2000 );

    return (
        <div>
            <h3>Interactive Map</h3>
            <Button type="primary"
                    onClick={ ()=> {
                        L.marker([51.505, -0.09])
                            .addTo(map)
                            .bindPopup('A beautiful popup for this marker.')
                            .openPopup();
                    }}>
                Add marker
            </Button>
            <div
                id="map"
                style={{
                    height: '700px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}