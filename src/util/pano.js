import { ImagePanorama } from 'panolens'
import { Vector3 } from 'three'
import { setCurrentPosition } from '../map'
import { locations, getLocationById } from './location'
import { loadInfoMarkers, setSidebarOpen } from './info'
import { loadNavMarkers } from './nav'

let currId = 1

const initPanorama = async (viewer, location) => {
  const { default: image } = await import('../assets/images/' + location.src)
  location.image = image
  const panorama = new ImagePanorama(image)
  viewer.add(panorama)
  location.panorama = panorama
  panorama.positions = location.positions
  panorama.addEventListener('leave', () => setSidebarOpen(false))
  panorama.addEventListener('enter-fade-start', (event) => {
    setCurrentPosition(event.target.positions)
  })
  return panorama
}

/*
const initNavMarkers = (location) => {
  location.navMarkers.forEach((marker) => {
    const panoToLink = getLocationById(marker.to).panorama
    const { x, y, z } = marker.position
    location.panorama.link(panoToLink, new Vector3(x, y, z), marker.scale)
  })
} */

const setPano = (viewer, id) => {
  const location = getLocationById(id)
  viewer.setPanorama(location.panorama)
}

const initAllPano = async (viewer) => {
  const panoPromises = locations.map((location) =>
    initPanorama(viewer, location)
  )
  await Promise.all(panoPromises)
//  locations.forEach((location) => initNavMarkers(location))
  locations.forEach((location) => loadInfoMarkers(location))
  locations.forEach((location) => loadNavMarkers(location, viewer))
  setPano(viewer, 1)
}

export { initAllPano, currId, setPano }
