import { useState, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import './Map.scss'

const containerStyle = {
    width: '100%',
    height: '60vh',
};

const Map = ({ onLocationSelect }) => {
    const [markers, setMarkers] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [enderecoCompleto, setEnderecoCompleto] = useState('');
    const [searchCenter, setSearchCenter] = useState({
        lat: -22.893428915340273,
        lng: -43.32589992452226,
    });

    const [CEPInput, setCEPInput] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [cepCoords, setCepCoords] = useState(null);

    const mapRef = useRef(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    const fetchPlaces = useCallback((center) => {
        if (!mapRef.current) return;
        const service = new window.google.maps.places.PlacesService(mapRef.current);
        const request = {
            location: center,
            radius: 5000,
            types: ['park', 'square'],
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                const places = results.map((place) => ({
                    id: place.place_id,
                    position: {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    },
                    name: place.name,
                }));
                setMarkers(places);
            } else {
                console.error('Erro na busca de praças:', status);
                setMarkers([]);
            }
        });
    }, []);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        fetchPlaces(searchCenter);
    }, [searchCenter, fetchPlaces]);

    const handleRefreshSearch = useCallback(() => {
        if (mapRef.current) {
            const currentMapCenter = mapRef.current.getCenter();
            const center = {
                lat: currentMapCenter.lat(),
                lng: currentMapCenter.lng(),
            };
            setSearchCenter(center);
            fetchPlaces(center);
        }
    }, [fetchPlaces]);

    const handleMarkerClick = useCallback((place) => {
        setSelectedPlace(place);
        if (onLocationSelect) {
            onLocationSelect({
                lat: place.position.lat,
                lng: place.position.lng,
                placeName: place.name,
            });
        }

        // 🔽 Aciona a busca inversa do marcador
        handleMarkerSelect(place.position.lat, place.position.lng);
    }, [onLocationSelect]);


    const handleMarkerSelect = async (lat, lng) => {
        try {
            const geocoder = new window.google.maps.Geocoder();
            const latlng = { lat, lng };

            geocoder.geocode({ location: latlng }, async (results, status) => {
                if (status === "OK" && results[0]) {
                    const result = results[0];
                    const cepComponent = result.address_components.find(c => c.types.includes("postal_code"));

                    if (!cepComponent) {
                        alert("CEP não encontrado para esta localização.");
                        return;
                    }

                    const cep = cepComponent.long_name;
                    setCEPInput(cep);

                    const response = await axios.post('http://localhost:3001/geo', {
                        endereco: cep
                    });

                    const { latitude: latResp, longitude: lngResp, enderecoCompleto } = response.data;

                    const newCenter = { lat: latResp, lng: lngResp };
                    setSearchCenter(newCenter);
                    mapRef.current?.panTo(newCenter);
                    setCepCoords(newCenter);
                    setEnderecoCompleto(enderecoCompleto);

                    fetchPlaces(newCenter);
                } else {
                    console.error("Erro ao geocodificar:", status);
                    alert("Endereço não encontrado para este marcador.");
                }
            });
        } catch (error) {
            console.error("Erro ao tratar seleção do marcador:", error);
            alert("Erro ao buscar o endereço do marcador.");
        }
    };

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        handleMarkerSelect(lat, lng);
    };


    const handleCepSearch = async () => {
        try {
            const response = await axios.post('http://localhost:3001/geo', { endereco: CEPInput });
            const { latitude: lat, longitude: lng, enderecoCompleto } = response.data;

            if (
                typeof lat !== 'number' ||
                typeof lng !== 'number' ||
                !isFinite(lat) ||
                !isFinite(lng)
            ) {
                throw new Error('Coordenadas inválidas');
            }

            const newCenter = { lat, lng };
            setSearchCenter(newCenter);
            setCepCoords(newCenter);
            setEnderecoCompleto(enderecoCompleto); // ✅ define o endereço
            mapRef.current?.panTo(newCenter);
            fetchPlaces(newCenter);
        } catch (error) {
            console.error('Erro ao buscar coordenadas do CEP:', error);
            alert('CEP inválido ou falha na busca.');
        }
    };



    if (loadError) return <div>Erro ao carregar o mapa</div>;
    if (!isLoaded) return <div>Carregando mapa...</div>;

    return (
        <section className='map-container'>
            <div className='d-flex justify-content-between '>
                <h3>Selecione o Local no Mapa</h3>
                <button onClick={handleRefreshSearch} className='search-button'>
                    Buscar Praças/Parques Nesta Área
                </button>
            </div>

            <div className='map-wrapper'>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={18}
                    center={searchCenter}
                    onLoad={onMapLoad}
                    onClick={(e) => handleMapClick(e)}
                >

                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={marker.position}
                            onClick={() => handleMarkerClick(marker)}
                        />
                    ))}

                    {selectedPlace && (
                        <Marker
                            position={selectedPlace.position}
                            onClick={() => handleMarkerClick(selectedPlace)}
                        />
                    )}
                </GoogleMap>

            </div>

            {selectedPlace && <p>Local selecionado: {selectedPlace.name}</p>}


            <div className='controls'>
                <fieldset>
                    <label htmlFor='CEP'>CEP</label>
                    <input
                        id='CEP'
                        type="text"
                        placeholder="Digite o CEP"
                        value={CEPInput}
                        onChange={(e) => setCEPInput(e.target.value)}
                        style={{
                            boxSizing: 'border-box',
                            border: '1px solid #ccc',
                            width: '100%',
                            height: '40px',
                            padding: '0 12px',
                            fontSize: '16px',
                        }}
                    />
                </fieldset>

                <button onClick={handleCepSearch} style={{ padding: '10px 16px' }}>
                    Buscar CEP
                </button>
                {
                    enderecoCompleto && <>
                        <label htmlFor='enderecoCompleto'>Endereço</label>
                        <input
                            id='enderecoCompleto'
                            type="text"
                            placeholder="Endereço completo"
                            value={enderecoCompleto}
                            disabled
                            style={{
                                boxSizing: 'border-box',
                                border: '1px solid #ccc',
                                width: '100%',
                                height: '40px',
                                padding: '0 12px',
                                fontSize: '16px',
                                backgroundColor: '#f5f5f5',
                                color: '#333',
                            }}
                        />
                    </>
                }


            </div>

            {cepCoords && (
                <div className='controls'>
                    <input
                        type="number"
                        placeholder="Número da rua"
                        value={streetNumber}
                        onChange={(e) => setStreetNumber(e.target.value)}
                        style={{
                            boxSizing: 'border-box',
                            border: '1px solid #ccc',
                            width: '100%',
                            height: '40px',
                            padding: '0 12px',
                            fontSize: '16px',
                        }}
                    />
                </div>
            )}

        </section>
    );
};

export default Map;
