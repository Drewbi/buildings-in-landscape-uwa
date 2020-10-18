import { DataImage } from 'panolens'
import { addInfospotToPano, initPanorama } from './pano'
import { getLocationById, prefetchImages } from './location'
import { loadInfoMarkers } from './info'
import { setLoading } from './control'
import homeIcon from '../assets/icons/home.png'

const setPano = async (viewer, id, lookAt) => {
  setLoading(true)
  const location = getLocationById(id)
  if (location) {
    if (lookAt) {
      viewer.nextLookAt = lookAt
    }
    const pano = await initPanorama(viewer, location)
    initNavMarkers(viewer, pano, location)
    loadInfoMarkers(location, pano)
    const oldPano = viewer.panorama
    viewer.setPanorama(pano)
    pano.addEventListener('leave-complete', () => {
      if (oldPano) viewer.remove(oldPano)
    })
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

const initNavMarkers = (viewer, pano, location) => {
  getMarkers(location).forEach((marker) => {
    const { position, scale, icon, to, lookAt } = marker
    addInfospotToPano(pano, position, scale, icon, () => {
      setPano(viewer, to, lookAt)
      console.log('Pano: ', to)
    })
  })
}

export { initNavMarkers, setPano }
