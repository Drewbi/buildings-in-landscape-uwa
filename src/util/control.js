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

const nextPano = (viewer) => {
  const location = getLocationById(viewer.panorama.locationId)
  if (location.forwardMarker) {
    setPano(viewer, location.forwardMarker.to)
    lookAt(location.forwardMarker.lookAt, viewer)
  }
}

const prevPano = (viewer) => {
  const location = getLocationById(viewer.panorama.locationId)
  if (location.backMarker) {
    setPano(viewer, location.backMarker.to)
    lookAt(location.backMarker.lookAt, viewer)
  }
}

const initControls = (viewer) => {
  createControl(forward, () => nextPano(viewer), viewer)
  createControl(home, () => setPano(viewer, 1), viewer) // the first location is the start
  createControl(back, () => prevPano(viewer), viewer)
}

export { initControls }
