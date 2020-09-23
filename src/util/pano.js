import { ImagePanorama, Infospot } from 'panolens'
import { Vector3 } from 'three'
import { setCurrentPosition } from '../map'
import { locations, getLocationById } from './location'
import { loadInfoMarkers, setSidebarOpen } from './info'
import forwardIcon from '../assets/icons/forward.png'
import backIcon from '../assets/icons/back.png'

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
    const forwardLink = new Infospot(forwardMarker.scale, forwardIcon)
    const { x: fx, y: fy, z: fz } = forwardMarker.position
    forwardLink.position.set(fx, fy, fz)
    forwardLink.addEventListener('click', () => {
      setPano(viewer, forwardMarker.to)
	  lookAt(forwardMarker.lookAt, viewer)
    })
    location.panorama.add(forwardLink)

    const backLink = new Infospot(backMarker.scale, backIcon)
    const { x: bx, y: by, z: bz } = backMarker.position
    backLink.position.set(bx, by, bz)
    backLink.addEventListener('click', () => {
      setPano(viewer, backMarker.to)
	  lookAt(backMarker.lookAt, viewer)
    })
    location.panorama.add(backLink)
  }

  location.navMarkers.forEach((marker) => {
    const panoToLink = getLocationById(marker.to).panorama
    const { x, y, z } = marker.position
    location.panorama.link(panoToLink, new Vector3(x, y, z), marker.scale)
  })
}

function lookAt (direction, viewer) {
  let threePos = new Vector3(direction.x, direction.y, direction.z) 
  viewer.tweenControlCenter( threePos, 0 )
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
