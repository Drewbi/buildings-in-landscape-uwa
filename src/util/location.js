import locations from '../data/location'

const getLocationById = (id) => {
  return locations.find((entry) => entry.id === id)
}

const prefetchImages = (location) => {
  const prefetchElement = document.getElementById('prefetch')
  if (prefetchElement !== null) {
    prefetchElement.innerHTML = ''
    // We want to have the back and forward markers included in the navMarkers array
    // If there are no navMarkers we need to create a new array so we can add to it
    if (!location.navMarkers) location.navMarkers = []
    if (location.forwardMarker) location.navMarkers.push(location.forwardMarker)
    if (location.backMarker) location.navMarkers.push(location.backMarker)
    location.navMarkers.forEach((marker) => {
      const nextLocation = getLocationById(marker.to)
      const imageElement = document.createElement('img')
      imageElement.setAttribute('src', nextLocation.image)
      imageElement.setAttribute('class', 'hidden')
      prefetchElement.appendChild(imageElement)
    })
  }
}

export { locations, getLocationById, prefetchImages }
