import React from "react";
import { Tabs, Redirect } from "expo-router";
import { View, Image, Text } from "react-native";

import { icons } from "../../constants";

const Tabicon = ({ color, name, focused, icon }) => {
  return (
    <View className="justify-center items-center mt-6">
      <Image
        source={icon}
        tintColor={color}
        resizeMode="contain"
        className="w-6 h-6"
      />
      <Text
        className={`text-[8px] ${focused ? "font-psemibold" : "font-pregular"} text-white`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
              backgroundColor: '#161622',
              borderTopWidth: 1,
              borderTopColor: "#232533",
              height: 84
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Tabicon
                icon={icons.home}
                color={color}
                focused={focused}
                name="Home"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Tabicon
                icon={icons.bookmark}
                color={color}
                focused={focused}
                name="Book"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Build",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Tabicon
                icon={icons.plus}
                color={color}
                focused={focused}
                name="Build"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Tabicon
                icon={icons.profile}
                color={color}
                focused={focused}
                name="Prof"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
