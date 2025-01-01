import { Platform, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { colorCode } from '../../../utils/ColorCombination/ColorCode';

export const LeftIconCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    marginRight:10,
    borderColor: "#FFB2AA",
    borderRadius: 20,
    backgroundColor: '#fff',
    width: responsiveWidth(92),
    height:responsiveHeight(18),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    width: '100%', // Full width of the container
    height: '100%', // Full height of the container
    borderRadius: 10, // Optional, if you want rounded corners
  },  
  buttonStyle: {
    borderRadius: 25,
    marginLeft: 25,
    backgroundColor:"white",
    borderColor:"#FFB2AA",
    borderWidth:1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  imageContainer: {
    width: responsiveHeight(15), // Set square size based on height
    height: responsiveHeight(15), // Same value as width
    justifyContent: 'center',
    alignItems: 'center', // Center align the SVG
    overflow:'hidden'
  },
  textContainer: {
    width: responsiveWidth(50),
    paddingLeft: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 15,
    fontWeight: '800',
    color: 'black',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#555',
    fontWeight:"600",
    marginBottom: 10,
  },
});
