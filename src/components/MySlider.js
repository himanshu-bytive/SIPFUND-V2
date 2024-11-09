import Slider from "@react-native-community/slider";
import React from "react";
//import { Slider } from "react-native-elements";

export default function MySlider(props) {
  const { value, max, min, change, steps } = props;

  const maxValue = Number(max); 
  const minValue = Number(min); 
  
  return (
    <Slider
      maximumValue={maxValue}
      minimumValue={minValue}
      step={steps}
      value={value}
      onValueChange={change}
      thumbStyle={{ height: 20, width: 20 }}
      maximumTrackTintColor={"#EDEDED"}
      minimumTrackTintColor={"#C0392B"}
      thumbTintColor={"#C0392B"}
    />
  );
}
