import { useState, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import './Map.scss'

const containerStyle = {
    width: '100%',
    height: '50vh',
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
    const [bairro, setBairro] = useState('');


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

                    const numberComponent = result.address_components.find(c => c.types.includes("street_number"));
                    if (numberComponent) {
                        setStreetNumber(numberComponent.long_name);
                    }

                    const response = await axios.post('http://localhost:3001/geo', {
                        endereco: cep
                    });

                    const { latitude: latResp, longitude: lngResp, enderecoCompleto, bairro } = response.data;
                    setBairro(bairro);

                    const newCenter = { lat: latResp, lng: lngResp };
                    setSearchCenter(newCenter);
                    mapRef.current?.panTo(newCenter);
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
            const { latitude: lat, longitude: lng, enderecoCompleto, bairro } = response.data;
            setBairro(bairro);

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

                <fieldset className='d-flex flex-column'>
                    <label htmlFor='CEP'>CEP</label>
                    <input
                        id='CEP'
                        type="text"
                        placeholder="Digite o CEP"
                        value={CEPInput}
                        onChange={(e) => setCEPInput(e.target.value)}
                        className='fs-5'
                    />
                </fieldset>

                <button onClick={handleCepSearch} style={{ padding: '10px 16px' }}>
                    Buscar CEP
                </button>

                <fieldset className='d-flex flex-column'>
                    <label htmlFor='enderecoCompleto'>Endereço</label>
                    <input
                        id='enderecoCompleto'
                        type="text"
                        placeholder="Endereço completo"
                        value={enderecoCompleto}
                        className='fs-5'
                    />
                </fieldset>


                <fieldset className='d-flex flex-column'>
                    <label htmlFor='numero'>Número</label>
                    <input
                        id='numero'
                        type="number"
                        placeholder="Número da rua"
                        value={streetNumber}
                        onChange={(e) => setStreetNumber(e.target.value)}
                        className='fs-5'
                    />
                </fieldset>

                <fieldset className='d-flex flex-column'>
                    <label htmlFor='bairro'>Bairro</label>
                    <input
                        id='bairro'
                        type="text"
                        placeholder="Bairro"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        className='fs-5'
                    />
                </fieldset>

            </div>

        </section>
    );
};

export default Map;
