import { ImagePanorama, Infospot } from 'panolens'
import { Vector3 } from 'three'
import { setCurrentPosition } from '../map'
import { locations, getLocationById } from './location'
import { loadInfoMarkers, setSidebarOpen } from './info'
import forwardIcon from '../assets/icons/forward.png'
import backIcon from '../assets/icons/back.png'

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

const initNavMarkers = (viewer, location) => {
  if (location.forwardMarker && location.backMarker) {
    const {
      forwardMarker: {
        to: forwardId = 1,
        scale: forwardScale = 1,
        position: fowardPos = { x: -5000, y: -5000, z: -5000 }
      }
    } = location
    const forwardLink = new Infospot(forwardScale, forwardIcon)
    const { x: fx, y: fy, z: fz } = fowardPos
    forwardLink.position.set(fx, fy, fz)
    forwardLink.addEventListener('click', () => {
      setPano(viewer, forwardId)
    })
    location.panorama.add(forwardLink)
    const {
      backMarker: {
        to: backId = 1,
        scale: backScale = 1,
        position: backPos = { x: -5000, y: -5000, z: -5000 }
      }
    } = location
    const backLink = new Infospot(backScale, backIcon)
    const { x: bx, y: by, z: bz } = backPos
    backLink.position.set(bx, by, bz)
    backLink.addEventListener('click', () => {
      setPano(viewer, backId)
    })
    location.panorama.add(backLink)
  }

  if (location.navMarkers) {
    location.navMarkers.forEach((marker) => {
      const { scale = 0, position = { x: -5000, y: -5000, z: -5000 } } = marker
      const panoToLink = getLocationById(marker.to).panorama
      const { x, y, z } = position
      location.panorama.link(panoToLink, new Vector3(x, y, z), scale)
    })
    console.log('yeet')
  }
}

const setPano = (viewer, id) => {
  const location = getLocationById(id)
  viewer.setPanorama(location.panorama)
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

export { initAllPano, setPano }
