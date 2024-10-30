/** @format */

import React from "react";
import { Image, Text } from "react-native";
import { SvgUri } from "react-native-svg";
import FastImage from "react-native-fast-image";

const MyImage = (props) => {
  const { svg, url, width, height, style, aspectRatio, sector } = props;
  if (sector) {
    return (
      <FastImage
        source={require("../../assets/sector.png")}
        style={{
          resizeMode: "contain",
          alignSelf: "center",
          aspectRatio: 1,
          height: 70,
          width: 70,
        }}
      />
    );
  }
  if (svg) {
    return (
      <>
        {height ? (
          <>
            <SvgUri
              style={{ resizeMode: "contain", alignSelf: "center" }}
              width={width}
              height={height ? height : 0}
              uri={url}
            />
          </>
        ) : (
          <>
            <SvgUri
              style={{
                resizeMode: "contain",
                alignSelf: "center",
                aspectRatio: 1,
              }}
              width={width}
              uri={url}
            />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <Text>{url}</Text>
      <FastImage
        source={{ uri: url, priority: FastImage.priority.normal }}
        // source={require('../../assets/moderate-funds.png')}
        style={style}
      />
    </>
  );
};

export default MyImage;
