import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { ButtonStyles } from './ButtonStyles';

const Button = ({
  onPress,
  text,
  height,
  width,
  backgroundColor,
  textColor,
  style,
  disabled = false, // Default value for disabled prop is false
  svgIcon: SvgIcon, // Add svgIcon prop
  svgIconLeft: SvgIconLeft, // Add svgIconLeft prop
}) => {
  return (
    <TouchableOpacity
      onPress={onPress} // onPress event handler
      style={[
        ButtonStyles.touchableOpacity, // Base styles for TouchableOpacity
        { height, width, backgroundColor, borderRadius: 25 }, // Customized styles for height, width, and backgroundColor
        style, // Additional custom styles passed from parent component
        disabled && ButtonStyles.disabled, // Apply disabled styles if disabled prop is true
      ]}
      disabled={disabled} // Pass the disabled prop to TouchableOpacity
      activeOpacity={1} // Set activeOpacity to 1 to maintain constant opacity
    >
      <View style={ButtonStyles.content}>
        {SvgIconLeft && <SvgIconLeft style={ButtonStyles.svgIconLeft} />}
        {/* Text component for displaying text */}
        <Text style={[ButtonStyles.text, { color: textColor }]}>{text}</Text>
        {/* Render SVG icon if provided */}
        {SvgIcon && <SvgIcon style={ButtonStyles.svgIcon} />}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
