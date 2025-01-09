import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllatestposts, getAllposts, searchPosts } from "../../lib/Appwrite";
import UseAppwrite from "../../lib/useAppwrite";
import Videocard from "../../components/Videocard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: posts, refetch } = UseAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // data={[{ id: 1 }, { id: 2 }]}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Videocard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
                <Text className="font-pmedium text-gray-100 text-sm">
                  Search Result
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {query}
            </Text>
            
            <View className="mt-10 mb-6">
              <SearchInput initialstate={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="Search that you dine is not in our databases"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
