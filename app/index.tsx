import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image, ScrollView, Text, View } from 'react-native'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '@/components/CustomButton'
import { useGlobalContext } from '@/context/GlobalProvider'

export default function App() {
  const {isLogged, loading} = useGlobalContext()
  if(isLogged && !loading) return <Redirect href='/home' />
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full items-center justify-center min-h-[85vh] px-4">
          <Image source={images.logo} resizeMode="contain" className="w-[130px] h-[84px]" />
          <Image source={images.cards} resizeMode="contain" className="w-full h-[300px]" />
          <View className="relative mt-5">
            <Text className="!text-3xl text-white font-bold text-center">
              Discover Endless {'\n'} Possibilities With <Text className="text-secondary-200">Aura</Text>
            </Text>
            <Image
              source={images.path}
              resizeMode="contain"
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center px-2">
            Where creativity meets innovation: embark on a journey of limitless exploration with Aora
          </Text>
          <CustomButton title="Continue with Email" handlePress={() => router.push('/sign-in')} containerStyle="w-full mt-7" />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}
