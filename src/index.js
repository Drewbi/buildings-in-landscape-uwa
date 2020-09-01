import { Viewer } from 'panolens'
import { initAllPano } from './util/pano'
import './main.css'

const root = document.getElementById('root')
const viewer = new Viewer({ container: root })
initAllPano(viewer)
