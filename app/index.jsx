import { Text, View, Image, ScrollView } from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import Custombutton from "../components/Custombutton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { useGlobalcontext } from "../context/GlobalProvider";

export default App = () => {
  const { isLoading, isLoggedin } = useGlobalcontext();

  if (!isLoading && isLoggedin) return <Redirect href="/home" />
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center items-center px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] h-[300px] w-full"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-center font-bold text-3xl text-white">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aoora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular capitalize text-gray-100 mt-8 text-center">
            Where creativity meets innovation:-embark on a journey of limitless
            exploration with Aoora.
          </Text>

          <Custombutton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />

        </View>
      </ScrollView>

      <StatusBar backgroundColor="#FFF" style="light" />
    </SafeAreaView>
  );
};
