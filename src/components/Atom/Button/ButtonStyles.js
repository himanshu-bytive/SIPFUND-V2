import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export const ButtonStyles = StyleSheet.create({
  touchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: responsiveFontSize(2),
    //fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5, // Reduce opacity for disabled state
  },
  content: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center',
  },
  svgIcon: {
    marginLeft: 5, // Space between text and icon
  },
  svgIconLeft: {
    marginRight: 5, // Space between text and left icon
  },
});
