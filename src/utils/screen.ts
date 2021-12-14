import {PixelRatio} from 'react-native';
import {isTablet} from 'react-native-device-info';

import {
  STANDARD_MOBILE_HEIGHT,
  STANDARD_MOBILE_WIDTH,
  STANDARD_TAB_HEIGHT,
  STANDARD_TAB_WIDTH,
} from '@src/constants';

export const deviceWidth = isTablet()
  ? STANDARD_TAB_WIDTH
  : STANDARD_MOBILE_WIDTH;

export const deviceHeight = isTablet()
  ? STANDARD_TAB_HEIGHT
  : STANDARD_MOBILE_HEIGHT;

export const scaleHeight = (height: number) => (scale: number) =>
  PixelRatio.roundToNearestPixel(height / deviceHeight) * scale;

export const scaleWidth = (width: number) => (scale: number) =>
  PixelRatio.roundToNearestPixel(width / deviceWidth) * scale;
