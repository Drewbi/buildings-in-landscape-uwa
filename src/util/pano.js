import { ImagePanorama, Infospot, DataImage } from 'panolens'
import { Vector3, IcosahedronBufferGeometry } from 'three'
import { state, getLocationById } from './state'

const initPano = (viewer, location) => {
  const panorama = new ImagePanorama(location.src)
  viewer.add(panorama)
  location.panorama = panorama
  return panorama
}

const initNavMarkers = (location) => {
  location.navMarkers.forEach((marker) => {
    const panoToLink = getLocationById(marker.to).panorama
    const { x, y, z } = marker.position
    location.panorama.link(panoToLink, new Vector3(x, y, z), marker.scale)
  })
}

const loadInfoMarkers = (location) => {
  location.infoMarkers.forEach((marker) => {
    // const infoElement = document.createElement('div')
    // infoElement.setAttribute('class', 'infospot')

    // const infoTitle = document.createElement('h3')
    // infoTitle.setAttribute('class', 'info-title')
    // infoTitle.innerText = marker.title

    // const infoText = document.createElement('p')
    // infoText.setAttribute('class', 'info-text')
    // infoText.innerText = marker.text

    // infoElement.appendChild(infoTitle)
    // infoElement.appendChild(infoText)

    // infoElement.appendChild(infoLabel)

    // Label element
    const infoLabelElement = document.createElement('div')
    infoLabelElement.setAttribute('class', 'info-label')

    const infoLabel = document.createElement('h3')
    infoLabel.setAttribute('class', 'info-label')
    infoLabel.innerText = marker.title

    infoLabelElement.appendChild(infoLabel)

    // the old info spot
    const infoSpot = new Infospot(300, DataImage.Info)
    // infoSpot.addHoverElement(infoElement)
    infoSpot.addHoverElement(infoLabel)
    const { x, y, z } = marker.position
    infoSpot.position.set(x, y, z)

    infoSpot.addEventListener('click', function () {
      this.focus()
    })

    location.panorama.add(infoSpot)
  })
}

const setPano = (viewer, id) => {
  const location = getLocationById(id)
  viewer.setPanorama(location.panorama)
}

const initAllPano = (viewer) => {
  state.forEach((location) => initPano(viewer, location))
  state.forEach((location) => initNavMarkers(location))
  state.forEach((location) => loadInfoMarkers(location))
  setPano(viewer, 1)
}

export { initAllPano }
