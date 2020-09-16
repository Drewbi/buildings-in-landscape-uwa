import { Viewer } from 'panolens'
import { Vector3 } from 'three'
import { initAllPano } from './util/pano'
import { initMapMarkers } from './map'
import { initSidebar } from './util/info'
import { getLocationById } from './util/location'
import './main.css'
import './index.html'

let currID = 1

const root = document.getElementById('root')
const viewer = new Viewer({
  container: root,
  autoHideInfospot: false,
  cameraFov: 85,
  output: 'overlay'
})
const aim = (currID) => {
  getLocationById(currID).navMarkers.direction
}
const backbutton = document.images['jsback']
const forwardbutton = document.images['jsforward']
const homebutton = document.images['jshome']

backbutton.onclick = function () {
  imgBack()
}
forwardbutton.onclick = function () {
  imgForward()
}
homebutton.onclick = function () {
  imgHome()
}

function imgBack() {
  const id = getPrev(currID)
  const location = getLocationById(id)
  viewer.setPanorama(location.panorama)
  return true
}

function imgForward() {
  const id = getNext(currID)
  const location = getLocationById(id)
  viewer.setPanorama(location.panorama)
  viewer.tweenControlCenter(aim)
  return true
}
function imgHome() {
  currID = 1
  const location = getLocationById(1)
  viewer.setPanorama(location.panorama)
  return true
}

function lookAt(direction) {
  let threePos = new Vector3(direction)
  viewer.tweenControlCenter(threePos, 0)
}

function getNext(iid) {
  currID = getLocationById(iid).navMarkers[0].to
  return currID
}

function getPrev(iid) {
  currID = getLocationById(iid).navMarkers[1].to
  return currID
}

initAllPano(viewer)
initMapMarkers()
initSidebar()
