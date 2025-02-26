/*import { View, Text } from 'react-native';
import { Video } from 'expo-av';
import React from 'react';

export default function UserAvatar() {
  return (
    <View className="flex-1">
      <View className="flex justify-center items-center mt-4">
        <Video
          source={require('../assets/videos/jenny.mp4')} // Asegúrate de que la ruta es correcta
          style={{ width: 200, height: 200 }} // Ajusta el tamaño del video
          //resizeMode="contain"          
          shouldPlay
          isLooping
          useNativeControls
        />
        <Text className="text-2xl">Jenny</Text>
      </View>
    </View>
  );
}*/

import { View, Text, Image} from 'react-native';
//import { Image as ExpoImage } from 'expo-image';
import React from 'react'



interface UserAvatarProps {
  name: string,
}

export default function UserAvatar({name}: UserAvatarProps) {
  return (
    <View className='flex-1'>
      <View className='flex justify-center items-center mt-4'>
      <Image className='w-20 h-20' source={require('../assets/images/Jenny.gif')}/>
        <Text className='text-2xl'>{name}</Text>
      </View>
    </View>
  )
}
