import { View, Text, Linking } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import UserAvatar from '@/components/UserAvatar';

export default function about() {
  return (
    <View className='flex flex-col h-2/3 justify-center items-center p-4'>
      <UserAvatar name='@Chris' />
      <Text className='text-xl'>
        Sobre mi
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia amet molestiae voluptates cupiditate! Unde, illum id dolores error iste culpa qui voluptas quos reiciendis, pariatur ut eaque sit commodi ad.
        Expedita deserunt consequatur, voluptatibus sunt quam eos voluptas! Quas libero tempora molestiae inventore quod reiciendis ducimus deserunt eos doloremque explicabo, similique sequi optio quis, ad perspiciatis omnis. Voluptates, ratione id!
      </Text>
      <View>
        <View className='flex flex-row items-center ml-4 mt-4'>
          <Ionicons name="logo-github" size={35} color="black" />
          <Text className='text-md text-blue-500 font-bold' onPress={(e) => {
            e.preventDefault()
            Linking.openURL('https://github.com/LuisLDA/clase-30-template')
          }}>@Chris</Text>
        </View>
        <View className='flex flex-row items-center ml-4 mt-4'>
          <Ionicons name="logo-linkedin" size={35} color="blue" />
          <Text className='text-md text-blue-500 font-bold' onPress={(e) => {
            e.preventDefault()
            Linking.openURL('https://github.com/LuisLDA/clase-30-template')
          }}>@Chris</Text>
        </View>
      </View>
    </View>
  )
}