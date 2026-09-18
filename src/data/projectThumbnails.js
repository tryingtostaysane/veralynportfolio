import bioscentImg from '../assets/work-cards/bioscent.jpg'
import bioscentHeroImg from '../assets/case-studies/bioscent/hero-banner.jpg'
import cookpilotImg from '../assets/work-cards/cookpilot.jpg'
import visualeyesImg from '../assets/work-cards/visualeyes.jpg'
import visualeyesFrameMeeting from '../assets/work-cards/visualeyes-frame-meeting.png'
import visualeyesFramePresentation from '../assets/work-cards/visualeyes-frame-presentation.png'
import visualeyesFrameGallery from '../assets/work-cards/visualeyes-frame-gallery.png'
import visualeyesFrameVideoCall from '../assets/work-cards/visualeyes-frame-video-call.png'

export { bioscentImg, bioscentHeroImg, cookpilotImg, visualeyesImg }

export const COOKPILOT_COOKING_INSTRUCTIONS = [
  {
    label: 'Step 1 of 5',
    text: ['Toast bread slices in pan or toaster until golden ', { highlight: 'brown.' }],
    meta: '4 min',
  },
  {
    label: 'Step 2 of 5',
    text: ['Fry spam bacon in a pan on medium heat until cooked ', { highlight: 'through.' }],
    meta: '5 min',
  },
  {
    label: 'Cooking assistant',
    icon: '✨',
    text: ['Spam looks pale and starting to cook. Keep frying on ', { highlight: 'medium' }, ' until brown and hot'],
    meta: null,
  },
]

// Home work-card crops this photo to a 462:245 box (object-fit: cover),
// so the detector ping/sky-frame coordinates below are calibrated
// against that cropped view. Every case-study hero banner shares ONE
// wide aspect ratio (HERO_ASPECT_RATIO, ~2170:725 - VisualEyes' own
// photo happens to already be that shape, which is why its hero needs
// no crop) so all three hero banners read as the same size/shape of
// panoramic strip. BioScent and CookPilot's photos are less wide than
// that, so their hero crops off the top/bottom (object-fit: cover) -
// the detector ping coordinates below are re-derived for that crop
// rather than reusing the card's numbers as-is, which were calibrated
// for the card's own (different) crop.
export const HERO_ASPECT_RATIO = '434 / 145'

export const BIOSCENT_CARD_DETECTION_POINT = { left: 77.34, top: 59.39 }
export const BIOSCENT_HERO_ASPECT_RATIO = HERO_ASPECT_RATIO
// The hero uses a separate, higher-resolution source photo
// (bioscentHeroImg, 2000x660) instead of the card's 1024x572 export -
// the card's photo was visibly pixelated once stretched across the
// much wider hero banner. It's a slightly different crop of the same
// render (device sits further right in frame), so the detection point
// is re-derived against it rather than reusing BIOSCENT_HERO's old value.
export const BIOSCENT_HERO_DETECTION_POINT = { left: 84.16, top: 56.36 }

export const COOKPILOT_HERO_ASPECT_RATIO = HERO_ASPECT_RATIO

export const VISUALEYES_CARD_SKY_FRAMES = [
  { src: visualeyesFrameMeeting, left: 32.44, top: 14.78, width: 12.45 },
  { src: visualeyesFramePresentation, left: 57.48, top: 8.11, width: 7.57 },
  { src: visualeyesFrameGallery, left: 55.51, top: 31.08, width: 10.75 },
  { src: visualeyesFrameVideoCall, left: 36.92, top: 47.8, width: 6.81 },
]
export const VISUALEYES_HERO_ASPECT_RATIO = HERO_ASPECT_RATIO
export const VISUALEYES_HERO_SKY_FRAMES = [
  { src: visualeyesFrameMeeting, left: 38.94, top: 14.78, width: 7.84 },
  { src: visualeyesFramePresentation, left: 54.71, top: 8.11, width: 4.77 },
  { src: visualeyesFrameGallery, left: 53.47, top: 31.08, width: 6.77 },
  { src: visualeyesFrameVideoCall, left: 41.76, top: 47.8, width: 4.29 },
]
