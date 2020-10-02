import { getLocationById } from './location'
import { setPano, lookAt } from './navigation'
import forwardIcon from '../assets/icons/forward.png'
import backIcon from '../assets/icons/back.png'
import homeIcon from '../assets/icons/home.png'
import loadingIcon from '../assets/icons/loading.png'

const createControl = (image, onTap, viewer) => {
  const forwardControl = {
    style: {
      backgroundImage: `url(${image})`
    },
    onTap: onTap
  }
  viewer.appendControlItem(forwardControl)
}

const createLoader = (viewer) => {
  const controlElem = document.createElement('span')
  controlElem.setAttribute('id', 'loader')
  // controlElem.setAttribute('class', 'hidden')
  const forwardControl = {
    style: {
      backgroundImage: `url(${loadingIcon})`
    },
    element: controlElem
  }
  viewer.appendControlItem(forwardControl)
}

const setLoading = (loading) => {
  const loader = document.getElementById('loader')
  if (loader) loader.toggleAttribute('hidden', !loading)
}

const navigateTo = (markerName, viewer) => {
  const location = getLocationById(viewer.panorama.locationId)
  if (location[markerName]) {
    setPano(viewer, location[markerName].to)
    if (location[markerName].lookAt) lookAt(location[markerName].lookAt, viewer)
  } else if (markerName === 'homeMarker') {
    setPano(viewer, 1)
    lookAt({ x: 4318.13, y: 1503.04, z: -121.49 }, viewer)
  }
}

const initControls = (viewer) => {
  createControl(forwardIcon, () => navigateTo('forwardMarker', viewer), viewer)
  createControl(homeIcon, () => navigateTo('homeMarker', viewer), viewer)
  createControl(backIcon, () => navigateTo('backMarker', viewer), viewer)
  createLoader(viewer)
}

export { initControls, setLoading }
