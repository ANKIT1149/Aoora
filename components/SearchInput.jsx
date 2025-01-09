import React, { Component, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({intialState}) => {
  const pathName = usePathname();
  const [Query, setQuery] = useState(intialState || "");

  return (
    <View style={styles.formfield} className="hover:bg-secondary-100 flex-row">
      <TextInput
        className="flex-1 text-white font-pregular mt-0.5 text-base"
        placeholder="Search for a video"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!Query) {
            return Alert.alert(
              "Missing Query",
              "Please search across the database"
            );
          }

          if (pathName.startsWith("search")) {
            router.setParams({ Query });
          } else {
            router.push(`search/${Query}`);
          }
        }}
      >
        <Image
          source={icons.search}
          className="w-6 h-6 mt-3 mr-3"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  formfield: {
    width: "full",
    height: "64px",
    borderColor: "#FF9C01",
    backgroundColor: "#1E1E2D",
    padding: "0px 16px",
  },
});
