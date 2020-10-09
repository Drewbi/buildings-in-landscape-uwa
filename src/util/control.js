import { getLocationById } from './location'
import { setPano } from './navigation'
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
    setPano(viewer, location[markerName].to, location[markerName].lookAt)
  } else if (markerName === 'homeMarker') {
    setPano(viewer, 23, { x: 4318.13, y: 1503.04, z: -121.49 })
  }
}

const initControls = (viewer) => {
  createControl(forwardIcon, () => navigateTo('forwardMarker', viewer), viewer)
  createControl(homeIcon, () => navigateTo('homeMarker', viewer), viewer)
  createControl(backIcon, () => navigateTo('backMarker', viewer), viewer)
  createLoader(viewer)
}

export { initControls, setLoading }
