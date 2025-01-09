import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { images } from "../constants";
import Custombutton from "./Custombutton";
import { router } from "expo-router";

const EmptyState = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

          <Text className="font-pmedium text-gray-100 text-sm mt-2">{title}</Text>
          <Text className="font-psemibold text-xl text-center text-white">{subTitle}</Text>

          <Custombutton title="Create Video" handlePress={() => router.push('/create')} containerStyles="w-full my-5"/>
    </View>
  );
};

export default EmptyState;
