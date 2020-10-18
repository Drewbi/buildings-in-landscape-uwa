import { DataImage } from 'panolens'
import { addInfospotToPano } from './pano'
import infoMarkers from '../data/info.json'

const initSidebar = () => {
  const close = document.getElementById('poiClose')
  close.addEventListener('click', () => {
    setSidebarOpen(false)
  })
}

const loadInfoMarkers = (location, pano) => {
  if (location.infoMarkers) {
    location.infoMarkers.forEach((marker) => {
      const markerInfo = getInfoMarkerById(marker.markerId)
      const { position, scale } = marker
      addInfospotToPano(
        pano,
        position,
        scale,
        DataImage.Info,
        ({ target }) => {
          setSidebarContent(target.userData)
          setSidebarOpen(true)
          target.onDismiss()
          console.log('Info: ', target.userData.id)
        },
        markerInfo
      )
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
  const infoPane = document.getElementById('infoPane')
  while (infoPane.childNodes.length > 1) {
    if (infoPane.firstChild.id !== 'poiClose') {
      infoPane.removeChild(infoPane.firstChild)
    } else {
      infoPane.appendChild(infoPane.firstChild)
      infoPane.removeChild(infoPane.firstChild)
    }
  }
  const titleElement = document.createElement('h1')
  titleElement.innerText = info.title
  infoPane.appendChild(titleElement)
  const bodyElement = document.createElement('p')
  bodyElement.innerText = info.text
  infoPane.appendChild(bodyElement)
  if (info.images) {
    info.images.forEach(async (image) => {
      const figureElement = document.createElement('figure')
      const imageElement = document.createElement('img')
      const { default: imageSrc } = await import(
        '../assets/images/' + image.id + '.JPG'
      )
      imageElement.setAttribute('src', imageSrc)
      const captionElement = document.createElement('figcaption')
      captionElement.innerText = image.caption
      figureElement.appendChild(imageElement)
      figureElement.appendChild(captionElement)
      infoPane.appendChild(figureElement)
    })
  }
  infoPane.scrollTop = 0
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
