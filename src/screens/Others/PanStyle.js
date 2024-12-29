import { StyleSheet } from "react-native";
import { Colors } from '../../common'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
      flex: 1,  
      alignItems: "center",
      backgroundColor: Colors.WHITE,
    },
    header: {
      borderBottomColor: Colors.BLACK,
      borderBottomWidth: 1,
    },
    mainbox: {
      padding: 10,
      flex: 1, // Make sure the mainbox takes up available space
      //justifyContent: 'flex-start', // Align items at the top (or space them out based on content)
    },
    logimg: {
      width: responsiveWidth(35), // Adjusted width
      height: responsiveHeight(5), // Adjusted height
      resizeMode: "contain", // Ensure the image fits within the bounds
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: responsiveWidth(3),
      marginTop: responsiveHeight(0),
    },
    imgbox: {
      alignItems: "center",
      marginBottom: 10,
    },
    Panimg: {
      height: 130,
      width: 230,
      marginVertical: 15,
    },
    inputsec: {
      borderBottomWidth: 1,
      borderColor: '#828282',
      fontSize: 15,
      marginLeft: 10,
      borderWidth:1,
      borderColor: '#FFB2AA',
      borderRadius: 8,
      width: "100%",
    },
    pan: {
      fontSize: 20,
      color: "#84898E",
      fontWeight: "bold",
      paddingLeft: 50,
      marginBottom: 10, // Space between the label and the input field
    },
    text_box: {
      flexDirection: 'row',
      alignItems: 'center', // Ensure proper alignment of the icon and input
      width: "90%", // Ensure text_box takes up full width
      height:100
    },
    button: {
      alignItems: "center",
      marginVertical: 40,
    },
    botton_box: {
      alignItems: "center",
      backgroundColor: Colors.RED,
      width: "80%",
      borderRadius: 5,
    },
    get_otp: {
      color: Colors.WHITE,
      fontSize: 20,
      fontWeight: 'bold',
    },
    bottomButtonContainer: {
      position: "absolute", // Fix it at the bottom
      bottom: 0, // Align at the very bottom
      width: "100%", // Full width of the screen
      alignItems: "center", // Center the button horizontally
      backgroundColor: Colors.WHITE, // Match background to the container
      paddingVertical: 10, // Space inside the container
      width: "100%",
      padding: responsiveWidth(1),
      backgroundColor: Colors.WHITE,
      alignItems: "center",
    },
    slogan: {
      fontSize: responsiveFontSize(3),
      color: Colors.BLACK,
      marginTop: responsiveHeight(2),
      marginBottom: responsiveHeight(1),
      fontFamily: "Jomolhari",
      fontWeight: "600"
    },
    sub_slogan: {
      fontSize: responsiveFontSize(1.9),
      color: Colors.BLACK,
      marginBottom: responsiveHeight(1),
      fontFamily: "Jomolhari",
    },
    bottomButton: {
      width: "90%",
      borderWidth: 1,
      borderColor: "#FFB2AA",
      borderRadius: 8,
      paddingVertical: responsiveHeight(1),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.WHITE,
      marginBottom: 0,
    },
    buttonText: {
      color: Colors.BLACK,
      fontSize: responsiveFontSize(2),
    },
    containBox: {
      paddingHorizontal: responsiveWidth(7),
      width: "100%",
    },
  });
  