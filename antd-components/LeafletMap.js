const { useEffect } = React;

function LeafletMap() {
    useEffect(() => {
        // Ensure Leaflet is loaded
        if (typeof L === 'undefined') {
            console.error('Leaflet library is not loaded.');
            return;
        }

        // Initialize the map
        const map = L.map('map').setView([51.505, -0.09], 13);

        // Add a tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        // Add a marker
        L.marker([51.505, -0.09])
            .addTo(map)
            .bindPopup('A beautiful popup for this marker.')
            .openPopup();

        // Clean up the map when the component unmounts
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    return (
        <div>
            <h3>Interactive Map</h3>
            <div
                id="map"
                style={{
                    height: '400px',
                    width: '100%',
                    border: '1px solid #ccc',
                }}
            ></div>
        </div>
    );
}