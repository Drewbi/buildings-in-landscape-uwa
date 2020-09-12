import image1 from '../assets/images/1.jpg'
import image2 from '../assets/images/2.jpg'
import image3 from '../assets/images/3.jpg'
import image4 from '../assets/images/4.jpg'
import image5 from '../assets/images/5.jpg'
import image6 from '../assets/images/6.jpg'
import image7 from '../assets/images/7.jpg'
import image8 from '../assets/images/8.jpg'
import image9 from '../assets/images/9.jpg'
import image10 from '../assets/images/10.jpg'
import image11 from '../assets/images/11.jpg'
import image12 from '../assets/images/12.jpg'
import image13 from '../assets/images/13.jpg'

const state = 
[
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
      },
      {
        to: 13,
        position: {
          x: 285,
          y: -609,
          z: -4943
        },
        scale: 300
      }
    ],
    infoMarkers: [
      {
        markerId: 1,
        position: {
          x: 244,
          y: 1433,
          z: -4774
        }
      },
      {
        markerId: 2,
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
      },
      {
        to: 3,
        position: {
          x: -4949,
          y: -503,
          z: -411
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
  },
  {
    id: 3,
    src: image3,
    navMarkers: [
      {
        to: 2,
        position: {
          x: -4990,
          y: 234,
          z: 2
        },
        scale: 300
      },
      {
        to: 4,
        position: {
          x: 104,
          y: 250,
          z: -4984
        },
        scale: 300
      },
      {
        to: 5,
        position: {
          x: 998,
          y: -439,
          z: 4875
        },
        scale: 300
      }
    ]
  },
  {
    id: 4,
    src: image4,
    navMarkers: [
      {
        to: 3,
        position: {
          x: 228,
          y: -703,
          z: -4935
        },
        scale: 300
      },
      {
        to: 11,
        position: {
          x: -114,
          y: -926,
          z: 4903
        },
        scale: 300
      }
    ]
  },
  {
    id: 5,
    src: image5,
    navMarkers: [
      {
        to: 3,
        position: {
          x: -4565,
          y: -553,
          z: 1943
        },
        scale: 300
      },
      {
        to: 6,
        position: {
          x: 1997,
          y: -576,
          z: -4541
        },
        scale: 300
      },
      {
        to: 10,
        position: {
          x: 3114,
          y: -986,
          z: 3771
        },
        scale: 300
      }
    ]
  },
  {
    id: 6,
    src: image6,
    navMarkers: [
      {
        to: 5,
        position: {
          x: -4037,
          y: 61,
          z: -2944
        },
        scale: 300
      },
      {
        to: 7,
        position: {
          x: -1291,
          y: -255,
          z: 4812
        },
        scale: 300
      },
      {
        to: 10,
        position: {
          x: -4806,
          y: -402,
          z: 1289
        },
        scale: 300
      }
    ]
  },
  {
    id: 7,
    src: image7,
    navMarkers: [
      {
        to: 6,
        position: {
          x: 799,
          y: -312,
          z: -4916
        },
        scale: 300
      },
      {
        to: 8,
        position: {
          x: -3711,
          y: -66,
          z: 3346
        },
        scale: 300
      },
      {
        to: 10,
        position: {
          x: -4752,
          y: -321,
          z: -1507
        },
        scale: 300
      },
      {
        to: 12,
        position: {
          x: 4649,
          y: -1188,
          z: 1384
        },
        scale: 300
      }
    ]
  },
  {
    id: 8,
    src: image8,
    navMarkers: [
      {
        to: 7,
        position: {
          x: 4657,
          y: -1383,
          z: 1141
        },
        scale: 300
      },
      {
        to: 9,
        position: {
          x: 169,
          y: -310,
          z: -4978
        },
        scale: 300
      },
      {
        to: 12,
        position: {
          x: -182,
          y: -1197,
          z: 4843
        },
        scale: 300
      }
    ]
  },
  {
    id: 9,
    src: image9,
    navMarkers: [
      {
        to: 8,
        position: {
          x: -4751,
          y: -216,
          z: 1527
        },
        scale: 300
      },
      {
        to: 10,
        position: {
          x: 1338,
          y: -1139,
          z: 4673
        },
        scale: 300
      },
      {
        to: 12,
        position: {
          x: -3154,
          y: -391,
          z: -3850
        },
        scale: 300
      },
      {
        to: 13,
        position: {
          x: 639,
          y: -484,
          z: -4927
        },
        scale: 300
      }
    ]
  },
  {
    id: 10,
    src: image10,
    navMarkers: [
      {
        to: 9,
        position: {
          x: 3673,
          y: -808,
          z: 3291
        },
        scale: 300
      },
      {
        to: 7,
        position: {
          x: 3156,
          y: -998,
          z: -3734
        },
        scale: 300
      },
      {
        to: 6,
        position: {
          x: -2621,
          y: -403,
          z: -4231
        },
        scale: 300
      },
      {
        to: 5,
        position: {
          x: -4751,
          y: -163,
          z: -1534
        },
        scale: 300
      }
    ]
  },
  {
    id: 11,
    src: image11,
    navMarkers: [
      {
        to: 4,
        position: {
          x: 228,
          y: -703,
          z: -4935
        },
        scale: 300
      }
    ]
  },
  {
    id: 12,
    src: image12,
    navMarkers: [
      {
        to: 7,
        position: {
          x: 4834,
          y: -1017,
          z: -702
        },
        scale: 300
      },
      {
        to: 9,
        position: {
          x: 3800,
          y: -567,
          z: -3184
        },
        scale: 300
      }
    ]
  },
  {
    id: 13,
    src: image13,
    navMarkers: [
      {
        to: 1,
        position: {
          x: -4668,
          y: -267,
          z: 1742
        },
        scale: 300
      },
      {
        to: 9,
        position: {
          x: -4451,
          y: -268,
          z: -2238
        },
        scale: 300
      }
    ]
  }
]

const getLocationById = (id) => {
  return state.find((entry) => entry.id === id)
}

export { state, getLocationById }
