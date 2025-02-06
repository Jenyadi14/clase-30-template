import BubbleMessages from '@/components/BubbleMessages'
import { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { View, FlatList, TextInput, Button } from 'react-native'

interface Message {
  id: number;
  message: string;
  type: "user" | "assistant";
}

const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");

export default function index() {
  const exampleMessages: Message[] = [
    {
      id: 1,
      message: 'Hola, como estas?',
      type: "user"
    },
    {
      id: 2,
      message: 'Holaaaa?',
      type: "assistant"
    }
  ]

  const [messages, setMessages] = useState(exampleMessages);
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const fetchApi = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = inputText;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    setMessages(prevMessages => [
      ...prevMessages,
      { id: prevMessages.length + 1, message: text, type: "assistant" }
    ]);
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        message: inputText,
        type: 'user'
      };
      setMessages(prevMessages => [
        ...prevMessages,
        newMessage
      ]);
      await fetchApi();
      setInputText(''); // Limpia el input después de enviar
    }
  };
  
  return (
    <View className='flex flex-col h-full p-4'>
      <FlatList 
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <BubbleMessages message={item.message} type={item.type} />
        )}
      />

      <View className='flex flex-row justify-between items-center'>
        <TextInput 
          className='border-2 border-gray-300 rounded-lg p-2 w-3/4'
          placeholder='Escribe un mensaje...'
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={e => {
            handleSendMessage();
            e.preventDefault();
          }}
        />
        <View className='w-1/4'>
          <Button title='enviar' onPress={handleSendMessage} />
        </View>
      </View>
    </View>
  )
}