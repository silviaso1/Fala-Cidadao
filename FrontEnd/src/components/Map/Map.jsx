import { useCallback, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: -22.893428915340273, // Exemplo: São Paulo
    lng: -43.32589992452226,
};


const Map = ({ onLocationSelect }) => {
    const [marker, setMarker] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const handleMapClick = useCallback((event) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setMarker(newMarker);
        if (onLocationSelect) {
            onLocationSelect(newMarker);
        }
    }, [onLocationSelect]);

    if (loadError) return <div>Erro ao carregar o mapa</div>;
    if (!isLoaded) return <div>Carregando mapa...</div>;

    return (
        <>
            <div id='google-map'>
                <h1>AAAAAAAAAAAAAAAA TO EM QUINTINO AAAAAAAAA</h1>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={14}
                    center={marker || center}
                    onClick={handleMapClick}
                >
                    {marker && <Marker position={marker} />}
                </GoogleMap>
            </div>
        </>
    );
};

export default Map;
