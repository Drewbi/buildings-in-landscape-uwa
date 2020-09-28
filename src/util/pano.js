import { ImagePanorama, Infospot } from 'panolens'
import { Vector3 } from 'three'
import { setCurrentPosition } from '../map'
import { locations, getLocationById } from './location'
import { loadInfoMarkers, setSidebarOpen } from './info'
import forwardIcon from '../assets/icons/forwardIcon.png'
import backIcon from '../assets/icons/backIcon.png'

const initPanorama = async (viewer, location) => {
  const { default: image } = await import('../assets/images/' + location.src)
  location.image = image
  const panorama = new ImagePanorama(image)
  panorama.locationId = location.id
  viewer.add(panorama)
  location.panorama = panorama
  panorama.positions = location.positions
  panorama.addEventListener('leave', () => setSidebarOpen(false))
  panorama.addEventListener('enter-fade-start', (event) => {
    setCurrentPosition(event.target.positions)
  })
  return panorama
}

const initNavMarkers = (viewer, location) => {
  if (location.forwardMarker && location.backMarker) {
    const { forwardMarker, backMarker } = location
    const forwardLink = new Infospot(forwardMarker.scale + 100, forwardIcon)
    const { x: fx, y: fy, z: fz } = forwardMarker.position
    forwardLink.position.set(fx, fy, fz)
    forwardLink.addEventListener('click', () => {
      setPano(viewer, forwardMarker.to)
    })
    location.panorama.add(forwardLink)

    const backLink = new Infospot(backMarker.scale + 100, backIcon)
    const { x: bx, y: by, z: bz } = backMarker.position
    backLink.position.set(bx, by, bz)
    backLink.addEventListener('click', () => {
      setPano(viewer, backMarker.to)
    })
    location.panorama.add(backLink)
  }

  location.navMarkers.forEach((marker) => {
    const panoToLink = getLocationById(marker.to).panorama
    const { x, y, z } = marker.position
    location.panorama.link(panoToLink, new Vector3(x, y, z), marker.scale)
  })
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
