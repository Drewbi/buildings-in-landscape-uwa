import { locations, getLocationById } from './location'
import { Infospot, DataImage } from 'panolens'
import { Vector3 } from 'three'
import { currId, setPano } from './pano'

const loadNavMarkers = (location, viewer) => {
  if (location.navMarkers) {
    location.navMarkers.forEach((marker) => {
      //const markerInfo = getInfoMarkerById(marker.markerId)

      const infoSpot = new Infospot(300, DataImage.ChevronRight)
      const { x, y, z } = marker.position
      infoSpot.position.set(x, y, z)
	  infoSpot.direction = marker.lookAt
	  infoSpot.to = marker.to

      infoSpot.addEventListener('click', ({ target }) => {
		console.log(target.to)
		setPano(viewer, target.to)
		lookAt(target.direction, viewer)
      })

      location.panorama.add(infoSpot)
    })
  }
}

function lookAt (direction, viewer) {
  let threePos = new Vector3(direction.x, direction.y, direction.z) 
  viewer.tweenControlCenter( threePos, 0 )
}

export { loadNavMarkers }