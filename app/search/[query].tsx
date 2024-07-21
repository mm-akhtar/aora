import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts, searchPosts } from '@/lib/apwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query as string))

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item: any) => item?.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />
        }}
        ListHeaderComponent={() => {
          return (
            <View className="my-6 px-4 flex space-y-6 gap-2">
                <Text className="text-sm font-pmedium text-gray-100">Search Results</Text>
                <Text className="text-2xl font-psemibold text-white">{query}</Text>
                <View className='pt-6 mb-8'>
                <SearchInput initialQuery={query as string} />
                </View>
            </View>
          )
        }}
        ListEmptyComponent={() => {
          return <EmptyState title="No Videos Found" subTitle="No videos found for this search query" />
        }}
      />
    </SafeAreaView>
  )
}

export default Search
