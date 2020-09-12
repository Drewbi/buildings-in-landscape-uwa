import { Viewer } from 'panolens'
import { initAllPano } from './util/pano'
import './main.css'
import { getLocationById } from './util/state'

const root = document.getElementById('root')
const viewer = new Viewer({
  container: root,
  autoHideInfospot: false,
  cameraFov: 85,
  output: 'overlay'
})

const infoPane = document.querySelector('.infoPane')
document.getElementById('toggle').onclick = function () {
  infoPane.classList.toggle('hidePane')
  root.classList.toggle('full')
}

//For testing of text/image updates
//Need to have an event for when an information "i" circle is clicked here with an ID
var counter = 0;



document.getElementById('update').onclick = () => {
  var title = document.getElementById('poiTitle');
  var info = document.getElementById('poiInfo');
  var image = document.getElementById('poiImage');
  if(counter === 0) {
    title.innerHTML = "Lorem ipsum";
    info.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula lacus vitae purus porttitor faucibus. Phasellus ac leo commodo, scelerisque nulla id, aliquam lacus. Ut enim mi, laoreet sed lectus vel, rutrum varius nunc. Sed sit amet libero a neque porta fringilla vel vitae felis. Suspendisse mattis quis lectus ac viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec posuere porta metus, non faucibus tortor semper vel.";
    image.src = "https://s3.getstickerpack.com/storage/uploads/sticker-pack/hide-the-pain-harold/sticker_5.png?35bc9a5413d14b83fb1eabdb6fe2523d&d=200x200";
    counter = 1;
  } 
  else {
    title.innerHTML = "Great Gateway";
    info.innerHTML = "The Great Gateway marks the entrance to Winthrop Hall and connects Winthrop Hall and the Administration Building. It houses the Senate Chamber on the first floor, where the governing body of the university meets. In the words of The University of Western Australia Act 1911 the Senate has “the entire control and management of the affairs of the University and may act in all matters concerning the University in such manner as appears to it best calculated to promote the interests of the University”. Lighting in the Senate chamber was mounted on a pedestal Grecian columns with lights installed on columns which are both classical and art nouveau in derivation and are similar to lights found at Yale University but were uncommon in Perth at the time. The flanking towers of the Gate are square at the base and octagonal at the top, which was supposed to liken it to the Tudor gateways of Oxford and Cambridge colleges. The stained-glass window was commissioned in memory of William Hancock, pioneer radiologist and former member of the University Senate.";
    image.src = "https://news.uwa.edu.au/files/imagecache/story_body/UWA_image_for_news_website.jpg";
    counter = 0;
  }
}

initAllPano(viewer)
