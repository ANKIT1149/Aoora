import React, { useState } from "react";
import { Image, View, ScrollView, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import Formfield from "../../components/Formfield";
import Custombutton from "../../components/Custombutton";
import { Link, router } from "expo-router";
import { CreateUser } from "../../lib/Appwrite";
import { useGlobalcontext } from "../../context/GlobalProvider";

const Signup = () => {
  const { setUser, setIsloggedin } = useGlobalcontext();
  const [form, setForm] = useState({
    username: '',
    email: "",
    password: "",
  });

  const [isSubmiting, setIssubmitting] = useState(false);

  const submit = async() => {
    if (!form.username || !form.email || !form.password) {
      return Alert.alert("Error", "Please fill all required field")
    }

    setIssubmitting(true);

    try {
      const result = await CreateUser(form.email, form.password, form.username);
      
      setUser(result);
      setIsloggedin(true)
      router.replace('/home')
    } catch (error) {
      Alert.alert('Eroor', error.message)
    }
    finally {
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
            Sign Up to Aoora
          </Text>

          <Formfield
            title="Username"
            value={form.username}
            handleClick={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            keyboardType="username"
          />

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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmiting}
          />

          <View className="justify-center pt-5 flex-row gap-3">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an Account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
