import { DataImage } from 'panolens'
import { addInfospotToPano } from './pano'
import { getLocationById, prefetchImages } from './location'
import { setLoading } from './control'
import homeIcon from '../assets/icons/home.png'

const setPano = (viewer, id, lookAt) => {
  setLoading(true)
  const location = getLocationById(id)
  if (location) {
    viewer.setPanorama(location.panorama)
    if (lookAt) {
      viewer.nextLookAt = lookAt
    }
    console.log('Pano: ' + id)
    prefetchImages(location)
  } else {
    console.error('Could not find location', id)
    setLoading(false)
  }
}

const getMarkers = (location) => {
  const markerList = []
  if (location.forwardMarker && location.forwardMarker.position) {
    location.forwardMarker.icon = DataImage.Arrow
    markerList.push(location.forwardMarker)
  }
  if (location.backMarker && location.backMarker.position) {
    location.backMarker.icon = DataImage.Arrow
    markerList.push(location.backMarker)
  }
  if (location.homeMarker && location.homeMarker.position) {
    location.homeMarker.icon = homeIcon
    markerList.push(location.homeMarker)
  }
  if (location.navMarkers) {
    location.navMarkers.forEach((marker) => {
      marker.icon = DataImage.Arrow
      markerList.push(marker)
    })
  }
  return markerList
}

const initNavMarkers = (viewer, location) => {
  getMarkers(location).forEach((marker) => {
    const { position, scale, icon, to, lookAt } = marker
    addInfospotToPano(location.panorama, position, scale, icon, () => {
      setPano(viewer, to, lookAt)
    })
  })
}

export { initNavMarkers, setPano }
