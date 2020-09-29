import mapboxgl from 'mapbox-gl'
import './map.css'
import { locations } from '../util/location'
//imports
mapboxgl.accessToken =
  'pk.eyJ1IjoiYW50b25pb2pvYm95IiwiYSI6ImNrZjFxb3huazIxdG8yc2w5MGR2NTJ2NmwifQ.jclnR2Zqjv8UUUM1r2w8fw'

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
const currentMarker = new mapboxgl.Marker(currentPos)
  .setLngLat([locations[0].positions.lon, locations[0].positions.lat])
  .addTo(map)

var nav = new mapboxgl.NavigationControl()
map.addControl(nav, 'top-left')

const initMapMarkers = () => {
  locations.forEach((entry) => {
    const markerElement = document.createElement('div')
    markerElement.className = 'marker'
    const { lat, lon } = entry.positions
    const position = [lon, lat]
    new mapboxgl.Marker(markerElement).setLngLat(position).addTo(map)
  })
}

const setCurrentPosition = (positions) => {
  const { lat, lon } = positions
  const position = [lon, lat]
  currentMarker.setLngLat(position)
  map.setCenter(position)
}

export { initMapMarkers, setCurrentPosition }
