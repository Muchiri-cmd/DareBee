import React from "react";
import { Dimensions, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { sliderImages } from "../constants/contants";

const width = Dimensions.get("window").width;

export default function ImageSlider() {
  return (
    <>
        <Carousel
          width={width}
          height={300}
          autoPlay
          loop
          data={sliderImages}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Image
              source={item}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
              }}
              resizeMode="cover"
            />
          )}
        />
    </>
   
  );
}
