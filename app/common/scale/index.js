import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const DEVICE_WIDTH = width;
export const DEVICE_HEIGHT = height;

// Guideline sizes are based on standard ~5" screen mobile device
const screenWidth = 411.43; // 360; //350
const screenHeight = 820.57; // 640; //680

const Width = width < height ? width : height;
const Height = width < height ? height : width;

const scale = (size) => (Width / screenWidth) * size;
const verticalScale = (size) => (Height / screenHeight) * size;
const moderateScale = (size, factor = 0.5) =>
    size + (scale(size) - size) * factor;

// example to https://github.com/nirsky/react-native-size-matters
// width: scale(30),
// height: verticalScale(50),
// padding: moderateScale(5)
export { scale, verticalScale, moderateScale, Width, Height };
