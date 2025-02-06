import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'index',
          tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name='about'
        options={{
          title: 'about',
          tabBarIcon: ({color}) => <Ionicons size={5} color={color} />
        }}
      />
    </Tabs>
  )
}