import { View, Text } from 'react-native'
import React from 'react'

interface BubbleMessagesProps {
  message: string;
  type: "user" | "assistant";
}

export default function BubbleMessages({message, type}: BubbleMessagesProps) {
  return (
    <View style={{ flexDirection: type === "user" ? "row-reverse" : "row", padding: 16 }}>
      <Text style={{ fontSize: 24 }}>{type === 'user' ? '👤' : '🤖'}</Text>
      <Text style={{ fontSize: 18, color: type === "user" ? 'white' : 'black', backgroundColor: type === "user" ? 'blue' : 'gray', padding: 8, borderRadius: 8 }}>{message}</Text>
    </View>
  )
}
