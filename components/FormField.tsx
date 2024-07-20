import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { FC, useState } from 'react'
import { icons } from '@/constants'

interface FormFieldProps {
  title: string
  value: string
  handelChangeText?: (e: any) => void
  otherStyles?: string
  keyboardType?: string
  placeholder?: string
}

const FormField: FC<FormFieldProps> = ({
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
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 rounded-2xl focus:border-secondary w-full h-16 px-4 bg-black-100 items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b78"
          onChangeText={handelChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
