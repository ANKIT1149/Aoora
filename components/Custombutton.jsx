// Imports
import React from "react";
import { Text, TouchableOpacity } from "react-native";

// custom button funcationality setup
const Custombutton = ({handlePress, title, containerStyles, isLoading, textStyles}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`} title={title}>
       {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Custombutton;
