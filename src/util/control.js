import { getLocationById } from './location'
import { setPano, lookAt } from './navigation'
import forward from '../assets/icons/forward.png'
import back from '../assets/icons/back.png'
import home from '../assets/icons/home.png'

const createControl = (image, onTap, viewer) => {
  const forwardControl = {
    style: {
      backgroundImage: `url(${image})`
    },
    onTap: onTap
  }
  viewer.appendControlItem(forwardControl)
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
  createControl(forward, () => navigateTo('forwardMarker', viewer), viewer)
  createControl(home, () => navigateTo('homeMarker', viewer), viewer) // the first location is the start
  createControl(back, () => navigateTo('backMarker', viewer), viewer)
}

export { initControls }
