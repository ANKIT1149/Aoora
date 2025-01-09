import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const Videocard = ({
  video: {
    title,
    thumbnail,
    videos,
    users: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(videos, (player) => {
      player.loop = false;
  });
  
  console.log(videos)
  
    const { isPlaying } = useEvent(player, "playingChange", {
      isPlaying: player.playing,
    });
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="flex-row gap-3 items-center justify-center flex-1">
          <View className="w-[46] h-[46] rounded-lg border border-secondary items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className=" justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play && player ? (
        <VideoView
          player={player}
          style={{
            width: 300,
            height: 350,
            marginTop: 10,
            borderRadius: 35,
          }}
          resizeMode="contain" // Ensures aspect ratio is maintained
          allowsPictureInPicture
          allowsFullscreen
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
            onPress={() => {
             if (isPlaying) {
               setPlay(false);
               player.pause()
             } else {
               setPlay(true);
               player.play()
             }
          }}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Videocard;
