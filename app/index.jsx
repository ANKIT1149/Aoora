import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "../global.css";
export default App = () => {
  return (
    <View className="bg-white items-center justify-center flex-1">
      <Text className=" text-3xl font-pblack italic">Aora!</Text>
      <StatusBar style="auto" />
      <Link href="/home" style={{ color: "blue" }}>
        Go To Home
      </Link>
    </View>
  );
};

