import locations from '../data/location'

const getLocationById = (id) => {
  return locations.find((entry) => entry.id === id)
}

const prefetchImages = async (location) => {
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
    const imagePromises = markers.map((marker) => {
      const nextLocation = getLocationById(marker.to)
      return import('../assets/pano/' + nextLocation.src)
    })
    const images = await Promise.all(imagePromises)
    images.forEach(({ default: image }) => {
      const imageElement = document.createElement('img')
      imageElement.setAttribute('src', image)
      imageElement.setAttribute('class', 'hidden')
      prefetchElement.appendChild(imageElement)
    })
  }
}

export { locations, getLocationById, prefetchImages }
