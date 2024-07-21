import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/lib/apwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'

const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const {data:posts, isLoading, refetch} = useAppwrite(getAllPosts)
  const {data:latestPosts} = useAppwrite(getLatestPosts)
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts ?? []}
        keyExtractor={(item:any) => item?.$id}
        renderItem={({ item }) => {
          return (
            <VideoCard video={item} />
          )
        }}
        ListHeaderComponent={() => {
          return (
            <View className='my-6 px-4 flex space-y-6 gap-2'>
              <View className='flex flex-row items-start justify-between mb-6'>
                <View>
                  <Text className='text-sm font-pmedium text-gray-100'>Welcome Back, </Text>
                  <Text className='text-2xl font-psemibold text-white'>{user?.username}</Text>
                </View>
                <View className='mt-1.5' >
                  <Image source={images.logoSmall} resizeMode='contain' className='w-9 h-8' />
                </View>
              </View>
              <SearchInput />
              <View className='w-full flex-1 pt-5 pb-8'>
                <Text className='text-lg font-pregular text-gray-100 mb-3'>Latest Videos</Text>
                <Trending posts={latestPosts ?? []} />
              </View>
            </View>
          )
        }}
        ListEmptyComponent={() => {
          return (
            <EmptyState title='No Videos Found' subTitle='Be the first one to upload a video' />
          )
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home
