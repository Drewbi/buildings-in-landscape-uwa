import { ImagePanorama } from 'panolens';
import { state, getLocationById } from './state';

const initPano = (viewer, location) => {
  const panorama = new ImagePanorama(location.src);
  viewer.add(panorama);
  location.panorama = panorama;
  return panorama;
}

const setPano = (viewer, id) => {
  const location = getLocationById(id)
  console.log(location);
  viewer.setPanorama(location.panorama)
}

const initAllPano = (viewer) => {
  state.forEach((location) => initPano(viewer, location))
  setPano(viewer, 1)
}


export { initAllPano };