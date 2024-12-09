import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens'; // Import the function
import App from './App'; // Adjust the path if necessary
import { name as appName } from './app.json';
// import messaging from '@react-native-firebase/messaging';

// Enable react-native-screens for better performance
enableScreens();

// Handle background messages
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
// });

// Register the main application
AppRegistry.registerComponent(appName, () => App);
