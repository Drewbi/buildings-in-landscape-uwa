import { Viewer } from 'panolens'
import { initAllPano } from './util/pano'
import './main.css'
import './index.html'
import { getLocationById } from './util/state'

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

function getNext(iid) {
  currID = getLocationById(iid).navMarkers[0].to
  return currID
}

function getPrev(iid) {
  currID = getLocationById(iid).navMarkers[1].to
  return currID
}

initAllPano(viewer)
