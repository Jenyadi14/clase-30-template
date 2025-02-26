import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="about" // Ahora "index" es el primero
        options={{
          title: "about",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="index" // Ahora "about" es el segundo
        options={{
          title: "index",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
