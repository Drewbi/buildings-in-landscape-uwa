import { Viewer } from 'panolens'
import { initAllPano } from './util/pano'
import { initMapMarkers } from './map'
import { initSidebar } from './util/info'
import './main.css'
import './map'

const root = document.getElementById('root')
const viewer = new Viewer({
  container: root,
  autoHideInfospot: false,
  cameraFov: 85,
  output: 'overlay'
})
initAllPano(viewer)
initMapMarkers()
initSidebar()
