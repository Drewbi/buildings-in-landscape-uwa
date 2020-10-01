import locations from '../data/location'

const getLocationById = (id) => {
  return locations.find((entry) => entry.id === id)
}

const prefetchImages = (location) => {
  const prefetchElement = document.getElementById('prefetch')
  if (prefetchElement !== null) {
    prefetchElement.innerHTML = ''

    // Nav markers
    if (location.navMarkers) {
      location.navMarkers.forEach((marker) => {
        const nextLocation = getLocationById(marker.to)
        const imageElement = document.createElement('img')
        imageElement.setAttribute('src', nextLocation.image)
        imageElement.setAttribute('style', 'display: none;')
        prefetchElement.appendChild(imageElement)
      })
    }

    // Back marker
    if (location.backMarker) {
      const backLocation = getLocationById(location.backMarker.to)
      const backImage = document.createElement('img')
      backImage.setAttribute('src', backLocation.image)
      backImage.setAttribute('style', 'display: none;')
      prefetchElement.appendChild(backImage)
    }

    // Forward marker
    if (location.forwardMarker) {
      const forwardLocation = getLocationById(location.forwardMarker.to)
      const forwardImage = document.createElement('img')
      forwardImage.setAttribute('src', forwardLocation.image)
      forwardImage.setAttribute('style', 'display: none;')
      prefetchElement.appendChild(forwardImage)
    }
  }
}

export { locations, getLocationById, prefetchImages }
