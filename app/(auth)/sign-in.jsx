import React, { useState } from "react";
import { Image, View, ScrollView, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import Formfield from "../../components/Formfield";
import Custombutton from "../../components/Custombutton";
import { Link, router } from "expo-router";
import { getCurrentUser, signin } from "../../lib/Appwrite";
import { useGlobalcontext } from "../../context/GlobalProvider";

const Signin = () => {
  const { setUser, setIsloggedin } = useGlobalcontext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmiting, setIssubmitting] = useState(false);
  
    const submit = async () => {
      if (!form.email || !form.password) {
        return Alert.alert("Error", "Please fill all required fields");
      }

      const sanitizedEmail = form.email.trim().toLowerCase();

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
        return Alert.alert("Error", "Invalid email format");
      }

      setIssubmitting(true);

      try {
        await signin(sanitizedEmail, form.password);
        const result = await getCurrentUser();

        setUser(result);
        setIsloggedin(true);

        router.replace("/home");
      } catch (error) {
        console.error("Error during login:", JSON.stringify(error, null, 2));
        Alert.alert("Error", error.message || "Invalid email or password");
      } finally {
        setIssubmitting(false);
      }
    };


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center px-4 my-6 min-h-[85vh]">
          <Image
            source={images.logo}
            style={{ width: 115, height: 35 }}
            resizeMode="contain"
          />
          <Text
            className="text-2xl text-white font-psemibold  text-semibold"
            style={{ marginTop: 10 }}
          >
            Login with Aoora
          </Text>

          <Formfield
            title="Email"
            value={form.email}
            handleClick={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-Address"
          />

          <Formfield
            title="Password"
            value={form.password}
            handleClick={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="password-manager"
          />

          <Custombutton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmiting}
          />

          <View className="justify-center pt-5 flex-row gap-3">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an Account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
