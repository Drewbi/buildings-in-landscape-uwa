import { Viewer } from 'panolens'
import { initAllPano } from './util/pano'
import { initMapMarkers } from './map'
import './main.css'
import './map'

const root = document.getElementById('root')
const viewer = new Viewer({
  container: root,
  autoHideInfospot: false,
  cameraFov: 85,
  output: 'overlay'
})
initMapMarkers()
initAllPano(viewer)
