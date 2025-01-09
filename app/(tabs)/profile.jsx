import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalcontext } from "../../context/GlobalProvider";
import Videocard from "../../components/Videocard";
import EmptyState from "../../components/EmptyState";
import { getprofileDetail, signOut } from "../../lib/Appwrite";
import Infobox from "../../components/Infobox";

const Profile = () => {
  const { user, setUser, setIsloggedin } = useGlobalcontext();
  const { data: posts } = useAppwrite(() => getprofileDetail(user.$id));
  console.log(posts);
  console.log(user.$id);
  console.log(user);

  const logout = async () => {
    await signOut();

    setUser(null);
    setIsloggedin(false);

    router.replace("/sign-in")
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Videocard video={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity onPress={logout} className="flex w-full items-end mb-10">
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <Infobox
              title={user?.username}
              containerStyles="mt-5"
              textStyles="text-lg"
            />

            <View className="mt-5 flex-row">
              <Infobox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-8"
                textStyles="text-xl"
              />

              <Infobox
                title="1.2k"
                subtitle="Followers"
                textStyles="text-lg"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
