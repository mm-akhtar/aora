import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/apwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext()
  const [form, setForm] = useState({ useName: '', email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password || !form.useName) {
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setIsSubmitting(true)
    try {
      const result = await createUser(form.email, form.password, form.useName)
      setUser(result)
      setIsLogged(true)
      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="">
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="!text-2xl text-white text-semibold mt-5 font-psemibold">Sign up to Aora</Text>
          <FormField
            title="Username"
            value={form.useName}
            handelChangeText={(e) => setForm({ ...form, useName: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handelChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handelChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton title="Sign Up" containerStyle="mt-7" handlePress={submit} isLoading={isSubmitting} />
          <View className="flex-row justify-center pt-5 gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link href="/sign-in" className="text-lg text-secondary font-psemibold">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
