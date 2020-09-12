import { ImagePanorama, Infospot, DataImage } from 'panolens'
import { Vector3 } from 'three'
import { state, getLocationById } from './state'
import infoMarkers from '../data/info.json'

const initPano = (viewer, location) => {
  const panorama = new ImagePanorama(location.src)
  viewer.add(panorama)
  location.panorama = panorama
  return panorama
}

const initNavMarkers = (location) => {
  location.navMarkers.forEach((marker) => {
    const panoToLink = getLocationById(marker.to).panorama
    const { x, y, z } = marker.position
    location.panorama.link(panoToLink, new Vector3(x, y, z), marker.scale)
  })
}



const loadInfoMarkers = (location) => {
  location.infoMarkers.forEach((marker) => {
    const infoSpot = new Infospot(300, DataImage.Info)
    infoSpot.addHoverText(infoMarkers[0].title)
    console.log(infoMarkers)
    const { x, y, z } = marker.position
    infoSpot.position.set(x, y, z)
    location.panorama.add(infoSpot)
  })
}

const setPano = (viewer, id) => {
  const location = getLocationById(id)
  viewer.setPanorama(location.panorama)
}

const initAllPano = (viewer) => {
  state.forEach((location) => initPano(viewer, location))
  state.forEach((location) => initNavMarkers(location))
  state.forEach((location) => loadInfoMarkers(location))
  setPano(viewer, 1)
}

export { initAllPano }
