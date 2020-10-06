import locations from '../data/location'

const getLocationById = (id) => {
  return locations.find((entry) => entry.id === id)
}

const prefetchImages = (location) => {
  const prefetchElement = document.getElementById('prefetch')
  if (prefetchElement !== null && location) {
    prefetchElement.innerHTML = ''
    // We want to have the back and forward markers included in the navMarkers array
    // If there are no navMarkers we need to create a new array so we can add to it
    const markers = []
    if (location.navMarkers)
      location.navMarkers.forEach((marker) => markers.push(marker))
    if (location.forwardMarker) markers.push(location.forwardMarker)
    if (location.backMarker) markers.push(location.backMarker)
    markers.forEach((marker) => {
      const nextLocation = getLocationById(marker.to)
      const imageElement = document.createElement('img')
      imageElement.setAttribute('src', nextLocation.image)
      imageElement.setAttribute('class', 'hidden')
      prefetchElement.appendChild(imageElement)
    })
  }
}

export { locations, getLocationById, prefetchImages }
