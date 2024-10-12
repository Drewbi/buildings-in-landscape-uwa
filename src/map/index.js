import mapboxgl from 'mapbox-gl'
import './map.css'
import { locations } from '../util/location'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZHJ1YmkwIiwiYSI6ImNtMjYyM3E5cjB0OXcycnNhdXltMjlvZWgifQ.T-oOfLr-yx84Y23eOYi12g'

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [115.817465, -31.976629],
  zoom: 17,
  pitchWithRotate: false,
  dragRotate: false
})

const currentPos = document.createElement('div')
currentPos.id = 'current-marker'
const currentMarker = new mapboxgl.Marker(currentPos, {
  offset: [0, -15]
})
if (locations[0].positions)
  currentMarker
    .setLngLat([locations[0].positions.lon, locations[0].positions.lat])
    .addTo(map)

const initMapMarkers = () => {
  locations.forEach((entry) => {
    if (entry.positions) {
      const markerElement = document.createElement('div')
      markerElement.className = 'marker'
      const { lat, lon } = entry.positions
      const position = [lon, lat]
      new mapboxgl.Marker(markerElement).setLngLat(position).addTo(map)
    }
  })
}

const setCurrentPosition = (positions) => {
  const { lat, lon } = positions
  const position = [lon, lat]
  currentMarker.setLngLat(position)
  map.setCenter(position)
}

export { initMapMarkers, setCurrentPosition }
