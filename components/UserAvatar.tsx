import { View, Text } from 'react-native';
import React, { useRef } from 'react';
import { Video, ResizeMode } from 'expo-av';

interface UserAvatarProps {
  name: string;
}

export default function UserAvatar({ name }: UserAvatarProps) {
  const videoRef = useRef<Video>(null);

  return (
    <View className="flex-1">
      <View className="flex justify-center items-center mt-4">
        {/* Video en lugar del logo PNG */}
        <Video
          ref={videoRef}
          source={require('../assets/videos/jenya.mp4')} // Ruta del video
          style={{ width: 80, height: 80, borderRadius: 40 }} // Tamaño similar a un avatar
          useNativeControls={false} // Oculta controles
          resizeMode={ResizeMode.COVER} // Ajusta el video al contenedor
          isLooping // Reproduce en bucle
          shouldPlay // Comienza automáticamente
          isMuted // Silenciado
          onError={(e) => console.log('Error cargando video:', e)}
          onLoad={() => console.log('Video cargado correctamente')}
        />
        <Text className="text-2xl">{name}</Text>
      </View>
    </View>
  );
}
