import { Viewer } from 'panolens'
import { initMapMarkers } from './map'
import { initSidebar } from './util/info'
import { initControls } from './util/control'
import { setPano } from './util/navigation'
import './main.css'

const root = document.getElementById('root')
const viewer = new Viewer({
  container: root,
  autoHideInfospot: false,
  cameraFov: 85,
  // output: 'console', // Position debug
  clickTolerance: 20,
  controlButtons: []
})

const start = async () => {
  await setPano(viewer, 1, { x: 4318, y: 1503, z: -121 })
  initControls(viewer)
  initMapMarkers()
  initSidebar()
}

start()
