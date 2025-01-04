import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { SvgProps } from 'react-native-svg';

interface CardWithLabelProps {
  SvgIcon?: React.FC<SvgProps>;
  imageSource?: ImageSourcePropType;
  label: string;
  style?: ViewStyle;
  onPress?: () => void;
  svgWidth?: number; // Optional width for SvgIcon
  svgHeight?: number; // Optional height for SvgIcon
}

export const CardWithLabel: React.FC<CardWithLabelProps> = ({
  SvgIcon,
  imageSource,
  label,
  style,
  onPress,
  svgWidth = 12,  // Default width for SvgIcon if not provided
  svgHeight = 12, // Default height for SvgIcon if not provided
}) => {
  return (
    <View style={{ margin: 10 }}>
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <View style={[styles.card, style]}>
          <View style={styles.imageContainer}>
            {SvgIcon ? (
              <SvgIcon width={responsiveWidth(svgWidth)} height={responsiveHeight(svgHeight)} />
            ) : imageSource ? (
              <Image
                source={imageSource}
                style={{
                  width: responsiveWidth(12),
                  height: responsiveHeight(12),
                  resizeMode: 'contain',
                }}
              />
            ) : null}
          </View>
          <Text style={styles.label}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    borderColor: '#FFB2AA',
    borderWidth: 2,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    height: responsiveHeight(15),
    width: responsiveWidth(45),
    padding: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
    flex: 1,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
});
