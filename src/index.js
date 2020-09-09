import { Viewer } from 'panolens'
import { initAllPano } from './util/pano'
import './main.css'

const root = document.getElementById('root')
const viewer = new Viewer({
  container: root,
  autoHideInfospot: false,
  cameraFov: 85,
  output: 'overlay'
})

const infoPane = document.querySelector('.infoPane')
document.getElementById('toggle').onclick = function () {
  infoPane.classList.toggle('hidePane')
  root.classList.toggle('full')
}

initAllPano(viewer)
