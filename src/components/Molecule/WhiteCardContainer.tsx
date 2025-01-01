import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {WhiteCardContainerProps} from './types'; // Ensure this type is adjusted for React Native

const WhiteCardContainer: React.FC<WhiteCardContainerProps> = ({
  minWidth,
  maxWidth,
  maxHeight,
  margin,
  overflow,
  background,
  children,
  display,
  flexDirection,
  height,
  marginTop,
  padding,
  header,
  backgroundColor = 'white',
  color,
  position,
  alignItems,
  justifyContent,
  onClick,
  gridTemplateColumns,
  gridTemplateRows,
  textAlign,
  width,
  headerFontSize = 14,
  headerFontWeight = 'bold',
  headerPadding = 10,
  borderRadius = 20,
  boxShadow,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
  border,
  classNameForWhiteCardContainer,
}) => {
  // Combine border values if individual values are provided
  const combinedBorder = border; // Default to 0 if not provided
  const combinedBorderTop = borderTop || combinedBorder;
  const combinedBorderRight = borderRight || combinedBorder;
  const combinedBorderBottom = borderBottom || combinedBorder;
  const combinedBorderLeft = borderLeft || combinedBorder;

  // Create a dynamic style object
  const containerStyle: any = {
    minWidth,
    maxWidth,
    margin,
    overflow,
    backgroundColor: background || backgroundColor,
    display,
    flexDirection,
    height,
    marginTop,
    padding,
    color,
    position,
    alignItems,
    justifyContent,
    width,
    borderRadius,
    ...(boxShadow && {elevation: 5}), // Example for shadow
    borderTopWidth: combinedBorderTop,
    borderLeftWidth: combinedBorderLeft,
    borderBottomWidth: combinedBorderBottom,
    borderRightWidth: combinedBorderRight,
    maxHeight,
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onClick}>
      {header && <Text>{header}</Text>}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    // Add other default styles if needed
  },
});

export default WhiteCardContainer;
