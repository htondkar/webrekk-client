import merge from 'ramda/es/merge'

const defaultAnimation = {
  animation: 'fade',
  duration: 2000,
  delay: 500,
}

export const getAnimationSetting = merge(defaultAnimation)
