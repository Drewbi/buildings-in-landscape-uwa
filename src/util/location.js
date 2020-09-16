import locations from '../data/location'

const getLocationById = (id) => {
  return locations.find((entry) => entry.id === id)
}

export { locations, getLocationById }
