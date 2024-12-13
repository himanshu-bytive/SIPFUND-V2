import React from 'react';
import { Text } from 'react-native';
import { colorCode } from '../../../utils/ColorCombination/ColorCode';

const Typography = ({
  color,
  fontSize,
  lineHeight,
  fontWeight,
  width, // New width property
  style,
  children,
  onPress,
}) => {
  // Define a textStyle object to hold styles for the Text component
  const textStyle = {
    // Set the color of the text to the provided color or default to black
    color: color || colorCode.LightBlack,
    // Set the font size to the provided font size or default to 14
    fontSize: fontSize || 14,
    // Set the line height to the provided line height or font size, or default to 20
    lineHeight: lineHeight || fontSize || 20,
    // Set the font weight to the provided font weight or default to 'normal'
    fontWeight: fontWeight || 'normal',
    // Set the width to the provided width or leave it undefined
    width: width,
  };

  // Return a Text component with the computed styles
  return (
    <Text onPress={onPress} style={[textStyle, style]}>
      {children}
    </Text>
  );
};

export default Typography;
