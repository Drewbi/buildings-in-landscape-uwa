import image from '../assets/images/1.jpg'

const state = [
  {
    id: 1,
    src: image
  }
]

const getLocationById = (id) => {
  return state.find((entry) => entry.id === id)
}

export { state, getLocationById }
