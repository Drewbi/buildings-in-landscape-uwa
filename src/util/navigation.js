import { Infospot, DataImage } from 'panolens'
import { getLocationById } from './location'
import { Vector3 } from 'three'

const setPano = (viewer, id) => {
  const location = getLocationById(id)
  viewer.setPanorama(location.panorama)
}

const lookAt = (direction, viewer) => {
  let threePos = new Vector3(direction.x, direction.y, direction.z)
  viewer.tweenControlCenter(threePos, 0)
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
    const forwardLink = new Infospot(forwardScale, DataImage.Arrow)
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
    const backLink = new Infospot(backScale, DataImage.Arrow)
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

export { initNavMarkers, setPano, lookAt }
