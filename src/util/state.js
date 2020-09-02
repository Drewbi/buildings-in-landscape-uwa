import image1 from '../assets/images/1.jpg'
import image2 from '../assets/images/2.jpg'

const state = [
  {
    id: 1,
    src: image1,
    navMarkers: [
      {
        to: 2,
        position: {
          x: -276,
          y: -672,
          z: 4936
        },
        scale: 300
      }
    ],
    infoMarkers: [
      {
        title: 'Great Gateway',
        text:
          'The Great Gateway marks the entrance to Winthrop Hall and connects Winthrop Hall and the Administration Building. It houses the Senate Chamber on the first floor, where the governing body of the university meets. In the words of The University of Western Australia Act 1911 the Senate has “the entire control and management of the affairs of the University and may act in all matters concerning the University in such manner as appears to it best calculated to promote the interests of the University”. Lighting in the Senate chamber was mounted on a pedestal Grecian columns with lights installed on columns which are both classical and art nouveau in derivation and are similar to lights found at Yale University but were uncommon in Perth at the time. The flanking towers of the Gate are square at the base and octagonal at the top, which was supposed to liken it to the Tudor gateways of Oxford and Cambridge colleges. The stained-glass window was commissioned in memory of William Hancock, pioneer radiologist and former member of the University Senate.',
        position: {
          x: 244,
          y: 1433,
          z: -4774
        }
      },
      {
        title: 'Five Lamps of Learning',
        text:
          "The Five Lamps of Learning mosaic is set in the lunette above the five windows to the Senate Room. The five figures in the mosaic, also known as The Five Lamps of Knowledge, represent five of the seven virtues of wisdom taken from Isaiah (XI.2): Sapientia (wisdom), Intellectus (understanding), Consilium (counsel), Fortitudo (courage) and Scientia (knowledge). Their names appear in the arches at the top of the windows to the Senate Room. The five figures hold lighted lamps and reflect the University's motto, 'Seek Wisdom'. They are contrasted with the five unwise figures in the background with unlit lamps, bowed in poses that express the idea of dejection. The mosaic was the first major art work to be commissioned for Winthrop Hall with funds from the Hackett Bequest. The University commissioned artist Mervyn Napier Waller to design and produce the mosaic in 1931. The mosaic is Byzantine in style, with standing figures elongated to compensate for the angle from which they are viewed from below. Napier Waller wrote the following in a letter, dated 12 January 1959, to Vice-Chancellor Prescott: \"As you see there are seven gifts of the Spirit; but in my design I have excluded Piety and Fear (of God.) The five windows below also suggested to me that the five gifts of the Spirit could become the five lamps of the wise virgins of Jesus’ parable, with each lighted lamp being one of the expressions of complete wisdom, as read on the soffits of the window below.",
        position: {
          x: 283,
          y: 3842,
          z: -3181
        }
      }
    ]
  },
  {
    id: 2,
    src: image2,
    navMarkers: [
      {
        to: 1,
        position: {
          x: 4921,
          y: -797,
          z: 272
        },
        scale: 300
      }
    ],
    infoMarkers: [
      {
        title: 'Reflection Pool',
        text:
          'This pool goes by many names, ‘the reflection pond’, ‘the moat’, ‘the reflection pool’ or just the University ‘Pond’. It was designed by Rodney Alsop to enhance the beauty of Winthrop Hall by giving the impression of greater height. It was completed only just in time for the official opening of Winthrop Hall on April 13, 1932. This was largely owing to the efforts of the student body (men) who volunteered to provide the labour force if the University provided the material. The pond was completed just hours before the ceremony took place and filled with water even though the cement was still wet (it was later drained, and the concrete had to be redone).',
        position: {
          x: 232,
          y: -606,
          z: 4947
        }
      }
    ]
  }
]

const getLocationById = (id) => {
  return state.find((entry) => entry.id === id)
}

export { state, getLocationById }
