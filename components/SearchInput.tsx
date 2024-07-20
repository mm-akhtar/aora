import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { FC, useState } from 'react'
import { icons } from '@/constants'

interface SearchInputProps {
  title?: string
  value?: string
  handelChangeText?: (e: any) => void
  otherStyles?: string
  keyboardType?: string
  placeholder?: string
}

const SearchInput: FC<SearchInputProps> = ({
  title,
  value,
  handelChangeText,
  otherStyles,
  keyboardType,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className="border-2 border-black-200 rounded-2xl focus:border-secondary w-full h-16 px-4 bg-black-100 items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b78"
        onChangeText={handelChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
