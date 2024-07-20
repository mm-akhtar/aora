import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { FC, useState } from 'react'
import * as AnimaTable from 'react-native-animatable'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'

interface TrendingProps {
  posts: { id: string }[]
}

const zoomIn = {
  0: {
    scale: 0.95,
  },
  1: {
    scale: 1.05,
  },
}
const zoomOut = {
  0: {
    scale: 1.05,
  },
  1: {
    scale: 0.95,
  },
}

const TrendingItem = ({ activeItem, item }: any) => {
  const [play, setPlay] = useState(false)
  return (
    // @ts-ignore
    <AnimaTable.View className="mx-5" animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
      {play ? (
        <Video
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          className="w-52 h-72 rounded-[33px] mt-3"
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay={true}
          isLooping={false}
          isMuted={true}
          onPlaybackStatusUpdate={(status) => {
            // @ts-ignore
            if (status?.didJustFinish) {
              setPlay(false)
            }
          }}
          videoStyle={{ width: 500, height: 300 }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          activeOpacity={0.7}
          className=" relative h-full w-full justify-center items-center"
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40 "
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </AnimaTable.View>
  )
}

const Trending: FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1])

  const viewableItemChange = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
    <FlatList
      data={posts}
      keyExtractor={(item: any) => item.$id}
      onViewableItemsChanged={viewableItemChange}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      renderItem={({ item }) => {
        return <TrendingItem activeItem={activeItem} item={item} />
      }}
      horizontal
    />
  )
}

export default Trending
