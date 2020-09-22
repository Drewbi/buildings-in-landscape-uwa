import { Viewer } from 'panolens'
import { initAllPano } from './util/pano'
import { initMapMarkers } from './map'
import { initSidebar } from './util/info'
import { initControls } from './util/control'
import './main.css'

const root = document.getElementById('root')
const viewer = new Viewer({
  container: root,
  autoHideInfospot: false,
  cameraFov: 85,
  output: 'console',
  clickTolerance: 20,
  controlButtons: []
})

const start = async () => {
  await initAllPano(viewer)
  initControls(viewer)
  initMapMarkers()
  initSidebar()
}

start()
