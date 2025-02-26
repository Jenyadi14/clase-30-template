import { View, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
// Import your global CSS file
import "../global.css";

const RootLayout = () => {
  return (
    <View className='flex-1'>
      <StatusBar barStyle={'dark-content'} />
      <Stack>
          <Stack.Screen name='(tabs)' options={{
              headerShown: false
          }} />
      </Stack>
    </View>
  )
}

export default RootLayout