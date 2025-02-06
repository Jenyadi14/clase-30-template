import { View, Text, Image } from 'react-native'
import React from 'react'

interface UserAvatarProps {
  name: string,
}

export default function UserAvatar({name}: UserAvatarProps) {
  return (
    <View className='flex-1'>
      <View className='flex justify-center items-center mt-4'>
        <Image className='w-20 h-20' source={require('../assets/images/react-logo.png')}/>
        <Text className='text-2xl'>{name}</Text>
      </View>
    </View>
  )
}