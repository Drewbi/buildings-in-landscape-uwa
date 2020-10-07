import { Infospot, DataImage } from 'panolens'
import { getLocationById, prefetchImages } from './location'
import { setLoading } from './control'
import { Vector3 } from 'three'
import homeIcon from '../assets/icons/home.png'


const setPano = (viewer, id) => {
  setLoading(true)
  const location = getLocationById(id)
  if (location) {
    viewer.setPanorama(location.panorama)
    prefetchImages(location)
  } else {
    console.error('Could not find location', id)
    setLoading(false)
  }
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
        position: fowardPos = { x: -5000, y: -5000, z: -5000 },
		lookAt: fwDir = { x: -470.02, y: 202.75, z: -4967.40}
      }
    } = location
    const forwardLink = new Infospot(forwardScale, DataImage.Arrow)
    const { x: fx, y: fy, z: fz } = fowardPos
    forwardLink.position.set(fx, fy, fz)
    forwardLink.addEventListener('click', () => {
      setPano(viewer, forwardId)
	  lookAt(fwDir, viewer)
	  console.log(viewer.panorama.locationId)
    })
    location.panorama.add(forwardLink)

    const {
      backMarker: {
        to: backId = 1,
        scale: backScale = 1,
        position: backPos = { x: -5000, y: -5000, z: -5000 },
		lookAt: backDir = { x: -470.02, y: 202.75, z: -4967.40}
      }
    } = location
    const backLink = new Infospot(backScale, DataImage.Arrow)
    const { x: bx, y: by, z: bz } = backPos
    backLink.position.set(bx, by, bz)
    backLink.addEventListener('click', () => {
      setPano(viewer, backId)
	  lookAt(backDir, viewer)
	  console.log(viewer.panorama.locationId)
    })
    location.panorama.add(backLink)

	if (location.homeMarker) {
		const {
			homeMarker: {
			to: homeId = 1,
			scale: homeScale = 1,
			position: homePos = { x: -5000, y: -5000, z: -5000 },
			lookAt: homeDir = { x: -470.02, y: 202.75, z: -4967.40}
		}
		} = location
		const homeLink = new Infospot(homeScale, homeIcon)
		const { x: hx, y: hy, z: hz } = homePos
		homeLink.position.set(hx, hy, hz)
		homeLink.addEventListener('click', () => {
			setPano(viewer, homeId)
			lookAt(homeDir, viewer)
			console.log(viewer.panorama.locationId)
		})
		location.panorama.add(homeLink)
	}
  }

  if (location.navMarkers) {
    location.navMarkers.forEach((marker) => {
      const { scale = 0, position = { x: -5000, y: -5000, z: -5000 } } = marker
      const panoToLink = getLocationById(marker.to).panorama
      const { x, y, z } = position
      location.panorama.link(panoToLink, new Vector3(x, y, z), scale)
    })
  }
}

export { initNavMarkers, setPano, lookAt }
