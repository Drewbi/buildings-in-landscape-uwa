import { ImagePanorama } from 'panolens'
import { initNavMarkers, setPano } from './navigation'
import { setCurrentPosition } from '../map'
import { locations } from './location'
import { loadInfoMarkers, setSidebarOpen } from './info'

const initPanorama = async (viewer, location) => {
  const { default: image } = await import('../assets/pano/' + location.src)
  location.image = image
  const panorama = new ImagePanorama(image)
  panorama.locationId = location.id
  viewer.add(panorama)
  location.panorama = panorama
  panorama.positions = location.positions
  panorama.addEventListener('leave', () => setSidebarOpen(false))
  panorama.addEventListener('enter-fade-start', (event) => {
    if (event.target.positions) setCurrentPosition(event.target.positions)
  })
  return panorama
}

const initAllPano = async (viewer) => {
  const panoPromises = locations.map((location) =>
    initPanorama(viewer, location)
  )
  await Promise.all(panoPromises)
  locations.forEach((location) => initNavMarkers(viewer, location))
  locations.forEach((location) => loadInfoMarkers(location))
  setPano(viewer, 1)
}

export { initAllPano }
