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

const initControls = (viewer) => {
  createControl(forward, () => console.log('forward'), viewer)
  createControl(home, () => console.log('home'), viewer)
  createControl(back, () => console.log('back'), viewer)
}

export { initControls }
