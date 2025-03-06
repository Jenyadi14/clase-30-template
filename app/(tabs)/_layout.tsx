import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function _layout() {
  return (
    <Tabs>
       <Tabs.Screen
        name='information'
        options={{
          title: 'information',
          tabBarIcon: ({color}) => <Ionicons name="bar-chart-outline" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          title: 'index',
          tabBarIcon: ({color}) => <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name='about'
        options={{
          title: 'about',
          tabBarIcon: ({color}) => <Ionicons name="person" size={24} color={color} />
        }}
      />
    </Tabs>
  )
}