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
      if (markerInfo) {
        const infoSpot = new Infospot(marker.scale, DataImage.Info)
        const { x, y, z } = marker.position
        infoSpot.position.set(x, y, z)

        console.log(marker)
        console.log(markerInfo)
        infoSpot.addHoverText(markerInfo.title)
        infoSpot.userData = markerInfo

        infoSpot.addEventListener('click', ({ target }) => {
          setSidebarContent(target.userData)
          setSidebarOpen(true)
          // target.focus()
          target.onDismiss()
        })

        location.panorama.add(infoSpot)
      }
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
