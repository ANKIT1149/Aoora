import React from "react";
import { Text, View } from "react-native";

const Infobox = ({ title, subtitle, containerStyles, textStyles }) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center capitalize font-psemibold ${textStyles}`}>
        {title}
      </Text>
      <Text className={`text-gray-100 text-center text-sm font-pregular ${textStyles}`}>
        {subtitle}
      </Text>
    </View>
  );
};
export default Infobox;
