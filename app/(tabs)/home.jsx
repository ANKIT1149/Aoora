import React, {useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllatestposts, getAllposts } from "../../lib/Appwrite";
import UseAppwrite from "../../lib/useAppwrite";
import Videocard from "../../components/Videocard";
import { useGlobalcontext } from "../../context/GlobalProvider";

const Home = () => {
  const { data: posts, refetch } = UseAppwrite(getAllposts);
  const { data: latestPost } = UseAppwrite(getAllatestposts);
  const { user } = useGlobalcontext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false)
  };

  console.log(posts);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // data={[{ id: 1 }, { id: 2 }]}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
         <Videocard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between flex-row items-start mb-6">
              <View>
                <Text className="font-pmedium text-gray-100 text-sm">
                  Welcome To ASM
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                 {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />

            <View className="pt-5 mb-8 flex-1 w-full">
              <Text className="text-lg text-gray-100 font-psemibold">
                Latest Video
              </Text>

              <Trending post={latestPost ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="Be the first one to upload the videos"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
