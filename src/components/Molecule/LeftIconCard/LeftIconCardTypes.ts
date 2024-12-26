import { SvgProps } from 'react-native-svg';

// Define the interface for the props of the LeftIconCard component
export interface LeftIconCardtypes {
  // SvgComponent: A React functional component that takes SvgProps
  SvgComponent: React.FC<SvgProps>;
  
  // heading: A string representing the heading text
  heading: string;
  
  // description: A string representing the description text
  description: string;
  
  // buttonText: A string representing the text to be displayed on the button
  buttonText: string;
  
  // onButtonPress: A function to be called when the button is pressed
  onButtonPress: () => void;
}
