import { Infospot, DataImage } from 'panolens'
import infoMarkers from '../data/info.json'

const initSidebar = () => {
  const close = document.getElementById('poiClose')
  close.addEventListener('click', () => {
    setSidebarOpen(false)
  })
}

const loadInfoMarkers = (location) => {
  if (location.infoMarkers) {
    location.infoMarkers.forEach((marker) => {
      const markerInfo = getInfoMarkerById(marker.markerId)

      const infoSpot = new Infospot(300, DataImage.Info)
      const { x, y, z } = marker.position
      infoSpot.position.set(x, y, z)

      infoSpot.addHoverText(markerInfo.title)
      infoSpot.userData = markerInfo

      infoSpot.addEventListener('click', ({ target }) => {
        setSidebarContent(target.userData)
        setSidebarOpen(true)
        // target.focus()
        target.onDismiss()
      })

      location.panorama.add(infoSpot)
    })
  }
}

const setSidebarOpen = (open) => {
  const infoPane = document.getElementById('infoPane')
  open
    ? infoPane.classList.remove('hidePane')
    : infoPane.classList.add('hidePane')
}

const setSidebarContent = (info) => {
  const titleElement = document.getElementById('poiTitle')
  titleElement.innerText = info.title
  const bodyElement = document.getElementById('poiText')
  bodyElement.innerText = info.text
}

const getInfoMarkerById = (id) => {
  return infoMarkers.find((entry) => entry.id === id)
}

export {
  infoMarkers,
  initSidebar,
  loadInfoMarkers,
  setSidebarOpen,
  setSidebarContent,
  getInfoMarkerById
}
