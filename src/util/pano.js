import { ImagePanorama, Infospot } from 'panolens'
import { Vector3 } from 'three'
import { initNavMarkers, setPano } from './navigation'
import { setCurrentPosition } from '../map'
import { locations } from './location'
import { loadInfoMarkers, setSidebarOpen } from './info'
import { setLoading } from './control'

const addInfospotToPano = (pano, pos, scale, icon, onclick, markerText) => {
  const infospot = new Infospot(scale, icon)
  infospot.position.set(pos.x, pos.y, pos.z)
  infospot.addEventListener('click', onclick)
  if (markerText) {
    infospot.addHoverText(markerText.title)
    infospot.userData = markerText
  }
  pano.add(infospot)
}

const setLookAt = (viewer) => {
  if (viewer.nextLookAt !== null) {
    viewer.tweenControlCenter(
      new Vector3(
        viewer.nextLookAt.x,
        viewer.nextLookAt.y,
        viewer.nextLookAt.z
      ),
      50
    )
    viewer.nextLookAt = null
  }
}

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
    setLoading(viewer, false)
    if (event.target.positions) setCurrentPosition(event.target.positions)
    setLookAt(viewer)
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
  setPano(viewer, 1, { x: 4318.13, y: 1503.04, z: -121.49 })
}

export { initAllPano, addInfospotToPano }
