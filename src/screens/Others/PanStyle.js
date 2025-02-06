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
      //justifyContent: 'flex-start', // Align items at the top (or space them out based on content)
    },
    loaderOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.3)", // Dim background
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
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
      paddingHorizontal: 10,
      marginTop: 5,
    },
    imgbox: {
      alignItems: "center",
      marginBottom: 0,
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
      padding:10
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
      height:100,
      marginTop:-10
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
      paddingVertical: 2, // Space inside the container
      width: "100%",
      padding: 5,
      backgroundColor: Colors.WHITE,
      alignItems: "center",
    },
    slogan: {
      fontSize: responsiveFontSize(3),
      color: Colors.BLACK,
      marginTop: 5,
      marginBottom: 5,
      fontFamily: "Jomolhari",
      fontWeight: "600"
    },
    sub_slogan: {
      fontSize: responsiveFontSize(1.9),
      color: Colors.BLACK,
      marginBottom: 10,
      fontFamily: "Jomolhari",
    },
    bottomButton: {
      width: "90%",
      borderWidth: 1,
      borderColor: "#FFB2AA",
      borderRadius: 8,
      paddingVertical: 5,
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
      paddingHorizontal: 10,
      width: "100%",
    },
  });
  