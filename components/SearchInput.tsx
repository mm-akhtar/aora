import { View, Text, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { icons } from '@/constants'
import { router, usePathname } from 'expo-router'

interface SearchInputProps {
  initialQuery?: string
}

const SearchInput:FC<SearchInputProps> = ({initialQuery}) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery ?? '')

  useEffect(() => {
    if(!pathname.startsWith('/search')) {
      setQuery('')
    }
  }, [pathname])

  return (
    <View className="border-2 border-black-200 rounded-2xl focus:border-secondary w-full h-16 px-4 bg-black-100 items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        value={query}
        placeholder={'Search for a video topic'}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        keyboardAppearance='dark'
        returnKeyType='search'
        onSubmitEditing={() => {
          if (!query) {
            return Alert.alert('Missing query', 'Please input something to search result across database')
          }

          if (pathname.startsWith('/search')) {
            router.setParams({ query })
          } else {
            router.push(`/search/${query}`)
          }
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert('Missing query', 'Please input something to search result across database')
          }

          if (pathname.startsWith('/search')) {
            router.setParams({ query })
          } else {
            router.push(`/search/${query}`)
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
