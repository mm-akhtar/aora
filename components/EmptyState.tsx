import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import { images } from '@/constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

interface EmptyStateProps {
    title?: string
    subTitle?: string
}

const EmptyState:FC<EmptyStateProps> = ({title, subTitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode="contain" />
      <Text className="text-xl text-center font-psemibold text-white">{title}</Text>
      <Text className="text-sm text-center font-pmedium text-gray-100">{subTitle}</Text>
      <CustomButton title="Create Video" handlePress={() => router.push('/create')} containerStyle='w-full my-5' />
    </View>
  )
}

export default EmptyState