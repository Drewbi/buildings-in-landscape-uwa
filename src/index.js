import { Viewer } from 'panolens'
import { initAllPano } from './util/pano'
import { initSidebar } from './util/info'
import './main.css'
import './assets/icons/close.svg'
import './index.html'

const root = document.getElementById('root')
const viewer = new Viewer({
  container: root,
  autoHideInfospot: false,
  cameraFov: 85,
  output: 'overlay'
})

initAllPano(viewer)
initSidebar()
