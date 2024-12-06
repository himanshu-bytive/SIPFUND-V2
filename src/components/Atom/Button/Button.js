import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { ButtonStyles } from './ButtonStyles';

const Button = ({
  onPress,
  text,
  height,
  width,
  backgroundColor,
  textColor,
  fontSize,
  style,
  disabled = false, // Default value for disabled prop is false
  svgIcon: SvgIcon, // Add svgIcon prop
  svgIconLeft: SvgIconLeft, // Add svgIconLeft prop
  isLoading = false, // Default value for isLoading is false
  loaderColor = 'white', // Default color for ActivityIndicator
}) => {
  return (
    <TouchableOpacity
      onPress={onPress} // onPress event handler
      style={[
        ButtonStyles.touchableOpacity, // Base styles for TouchableOpacity
        { 
          height, 
          width, 
          backgroundColor, 
          borderRadius: 25,
          opacity: isLoading || disabled ? 0.8 : 1, // Conditionally reduce opacity based on loading or disabled
        }, // Customized styles for height, width, and backgroundColor
        style, // Additional custom styles passed from parent component
      ]}
      disabled={disabled || isLoading} // Disable button when loading or explicitly disabled
      activeOpacity={1} // Set activeOpacity to 1 to maintain constant opacity
    >
      <View style={ButtonStyles.content}>
        {SvgIconLeft && !isLoading && <SvgIconLeft style={ButtonStyles.svgIconLeft} />}
        {isLoading ? (
          // Display loader when isLoading is true
          <ActivityIndicator size="small" color={loaderColor} />
        ) : (
          // Display text when not loading
          <Text style={[ButtonStyles.text, { color: textColor, fontSize }]}>{text}</Text>
        )}
        {SvgIcon && !isLoading && <SvgIcon style={ButtonStyles.svgIcon} />}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
