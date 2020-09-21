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
	  const direction = marker.lookAt

      //infoSpot.addHoverText(markerInfo.title)
      //infoSpot.userData = markerInfo

      infoSpot.addEventListener('click', ({ target }) => {
		setPano(viewer, target.to)
		console.log(target)
		lookAt(currId, target.to)
		currId = target.to
		// setSidebarContent(target.userData)
        // setSidebarOpen(true)
        // target.focus()
        // target.onDismiss()
      })

      location.panorama.add(infoSpot)
    })
  }
}

function lookAt (direction) {
  let threePos = new Vector3(direction) 
  viewer.tweenControlCenter( threePos, 0 )
}

export { loadNavMarkers }