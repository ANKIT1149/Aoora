import { useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const [thumbnail, setThumbnail] = useState(true);
  const player = useVideoPlayer(item.videos, (player) => {
    player.loop = false;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  // const handleEnd = () => {
  //   setThumbnail(false);
  // };

  console.log("Video source:", item.videos);
  console.log("Play state:", play, "Is playing:", isPlaying);
  console.log(item.$id)
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={900}
    >
      {thumbnail ? (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            if (!isPlaying) {
              player.play();
              setPlay(true);
              setThumbnail(true);
            } else {
              player.pause();
              setPlay(false);
              setThumbnail(false);
            }
          }}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <VideoView
          player={player}
          style={{
            width: 208,
            height: 278,
            marginTop: 10,
            borderRadius: 35,
            backgroundColor: "rgb(255 255 255 / 0.1)",
          }}
          resizeMode="contain" // Ensures aspect ratio is maintained
          allowsPictureInPicture
          allowsFullscreen
        />
      )}
    </Animatable.View>
  );
};

const Trending = ({ post }) => {
  const [activeItem, setActiveItem] = useState(post[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={post}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
