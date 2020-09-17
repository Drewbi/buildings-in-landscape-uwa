import forward from '../assets/icons/forward.png'
import back from '../assets/icons/back.png'
import home from '../assets/icons/home.png'

import { setPano } from './pano'

const createControl = (image, onTap, viewer) => {
  const forwardControl = {
    style: {
      backgroundImage: `url(${image})`
    },
    onTap: onTap
  }
  viewer.appendControlItem(forwardControl)
}

const initControls = (viewer) => {
  console.log(viewer)
  createControl(forward, () => setPano(viewer, viewer.panorama), viewer)
  createControl(home, () => console.log('home'), viewer)
  createControl(back, () => console.log('back'), viewer)
}

export { initControls }
