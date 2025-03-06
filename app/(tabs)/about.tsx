import { View, Text, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserAvatar from '@/components/UserAvatar';

export default function About() {
  return (
    <View className="flex flex-col h-2/3 justify-center items-center p-4">
      <UserAvatar name="@Jenyadi" />
      
      <Text>
        Soy Jenny Rosero estoy en decimo Semestre, de la carrera de ingenieria en sistemas !
      </Text>

      {/* Sección de redes sociales */}
      <View>
        {/* GitHub */}
        <View className="flex flex-row items-center ml-4 mt-4">
          <Ionicons name="logo-github" size={35} color="black" />
          <Text
            className="text-md text-blue-500 font-bold ml-2"
            onPress={() => Linking.openURL('https://github.com/Jenyadi14/clase-30-template.git')}
          >
            @Jenyadi
          </Text>
        </View>

        {/* LinkedIn */}
        <View className="flex flex-row items-center ml-4 mt-4">
          <Ionicons name="logo-linkedin" size={35} color="blue" />
          <Text
            className="text-md text-blue-500 font-bold ml-2"
            onPress={() => Linking.openURL('https://www.linkedin.com/in/jenny-rosero-4a0317204')}
          >
            Jenny Rosero
          </Text>
        </View>

        {/* Twitch */}
        <View className="flex flex-row items-center ml-4 mt-4">
          <Ionicons name="logo-twitch" size={35} color="purple" />
          <Text
            className="text-md text-purple-500 font-bold ml-2"
            onPress={() => Linking.openURL('https://www.twitch.tv/?lang=es-ES')}
          >
            Twitch
          </Text>
        </View>
      </View>
    </View>
  );
}
