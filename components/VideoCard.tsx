import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'

interface VideoCardProps {
  video: any
}

const VideoCard: FC<VideoCardProps> = ({ video }) => {
  const {
    title,
    video: videoUrl,
    thumbnail,
    creator: { username, avatar },
  } = video

  const [play, setPlay] = useState(false)
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image source={{ uri: avatar }} resizeMode="cover" className="w-full h-full rounded-lg" />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-gray-100 text-xs font-pregular" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View className="p-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: videoUrl }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            // @ts-ignore
            if (status?.didJustFinish) {
              setPlay(false)
            }
          }}
          onTouchEnd={() => setPlay(false)}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          activeOpacity={0.7}
          className="w-full h-60 mt-3 rounded-xl relative justify-center items-center"
        >
          <Image source={{ uri: thumbnail }} className="w-full h-full rounded-xl mt-3 " resizeMode="cover" />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard
