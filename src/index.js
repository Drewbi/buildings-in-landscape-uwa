import { Viewer } from 'panolens'
import { initAllPano } from './util/pano'
import './main.css'
import html from './index.html'
import { getLocationById } from './util/state'

let currID = 1

const root = document.getElementById('root')
const viewer = new Viewer({
  container: root,
  autoHideInfospot: false,
  cameraFov: 85,
  output: 'overlay'
})
const backbutton = document.images['jsback']
const forwardbutton = document.images['jsforward']

backbutton.onclick = function() {imgBack()}
forwardbutton.onclick = function() {imgForward()}

function imgBack(){
	console.log(currID)
	const id = getPrev(currID)
	const location = getLocationById(id)
	viewer.setPanorama(location.panorama)
	return true;
}

function imgForward(){
	console.log(currID)
	const id = getNext(currID)
	const location = getLocationById(id)
	viewer.setPanorama(location.panorama)
	return true;
}

function getNext(iid){
	currID = getLocationById(iid).navMarkers[0].to
	return currID
}

function getPrev(iid){
	currID = getLocationById(iid).navMarkers[1].to
	return currID
}

initAllPano(viewer)
