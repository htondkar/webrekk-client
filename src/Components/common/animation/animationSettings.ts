import { merge } from 'ramda'

const defaultAnimation = {
  animation: 'fade',
  duration: 2000,
  delay: 500,
}

export const getAnimationSetting = merge(defaultAnimation)
