import React from 'react';
import { View, Text, Image } from 'react-native';
import { LeftIconCardStyles } from './LeftIconCardStyles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Button from '../../Atom/Button/Button';
import Colors from '../../../common/Colors';

// Define the LeftIconCard component using React (in JavaScript)
const LeftIconCard = ({
  imageSource, // Accept the PNG image source
  heading,
  description,
  buttonText,
  onButtonPress,
}: any) => {
  return (
    <View style={LeftIconCardStyles.container}>
      {/* Container for the PNG image */}
      <View style={LeftIconCardStyles.imageContainer}>
        <Image
          source={imageSource} // Pass the image source here
          style={LeftIconCardStyles.image} // Apply styles for proper sizing
          resizeMode="contain" // Ensures the image scales properly
        />
      </View>

      {/* Container for the text and button */}
      <View style={LeftIconCardStyles.textContainer}>
        {/* Heading text */}
        <Text style={LeftIconCardStyles.heading}>{heading}</Text>
        {/* Description text */}
        <Text style={LeftIconCardStyles.description}>{description}</Text>
        {/* Button component with styles and props */}
        <Button
          style={LeftIconCardStyles.buttonStyle}
          text={buttonText}
          textColor="#FFB2AA"
          backgroundColor={Colors.RED}
          width={responsiveWidth(35)}
          height={responsiveHeight(6)}
          onPress={onButtonPress}
          fontSize={16} // Add the missing fontSize prop
          svgIcon={null} // Add svgIcon if needed, or provide an actual component/icon
          svgIconLeft={null} // Add svgIconLeft if needed, or provide an actual component/icon
        />
      </View>
    </View>
  );
};

export default LeftIconCard;
