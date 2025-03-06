/*import BubbleMessages from '@/components/BubbleMessages'
import { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { View, FlatList, TextInput, Button } from 'react-native'

interface Message {
  id: number;
  message: string;
  type: "user" | "assistant";
}

const genAI = new GoogleGenerativeAI("AIzaSyC4fBQlcN6exAZuIBw77MZuh_CHWumUmRU");

export default function index() {
  const exampleMessages: Message[] = [
    { id: 1, message: 'Hola, como estas?', type: "user" },
    { id: 2, message: 'Holaaaa?', type: "assistant" }
  ];

  const [messages, setMessages] = useState(exampleMessages);
  const [inputText, setInputText] = useState("");

  const fetchApi = async () => {
    console.log("📡 Enviando solicitud a Gemini con:", inputText);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = inputText;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      console.log("✅ Respuesta de Gemini:", text);

      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, message: text, type: "assistant" }
      ]);
    } catch (error) {
      console.error("❌ Error en fetchApi:", error);
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      console.log("✉️ Enviando mensaje:", inputText);

      const newMessage: Message = {
        id: messages.length + 1,
        message: inputText,
        type: 'user'
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText(''); // Limpia el input después de enviar

      await fetchApi();
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
          <Button title='Enviar' onPress={handleSendMessage} />
        </View>
      </View>
    </View>
  );
}*/

/*import BubbleMessages from '@/components/BubbleMessages';
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { View, FlatList, TextInput, Button, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system'; //Accede a archivos en el sistema de almacenamiento
import * as XLSX from 'xlsx';

interface Message {
  id: number;
  message: string;
  type: "user" | "assistant";
}

const genAI = new GoogleGenerativeAI("AIzaSyC4fBQlcN6exAZuIBw77MZuh_CHWumUmRU");


export default function ChatWithExcel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  //Funcion para seleccionar y leer el archivo Excel
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel"
        ],
        copyToCacheDirectory: true
      });

      if (result.canceled || !result.assets) return;

      const uri = result.assets[0].uri;
      const fileContent = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      processExcel(fileContent, 'base64');
    } catch (error) {
      Alert.alert('Error', 'No se pudo leer el archivo');
      console.error(error);
    }
  };

  // Función para procesar el archivo Excel y contar las palabras clave
  const processExcel = (fileContent: string, type: string) => {
    try {
      const workbook = XLSX.read(fileContent, { type });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      const extractedKeywords = data.map((row: any) => row.keywords).filter(Boolean);
      setKeywords(extractedKeywords);
      Alert.alert("Éxito", "Archivo procesado correctamente");
    } catch (error) {
      Alert.alert('Error', 'No se pudo procesar el archivo');
      console.error(error);
    }
  };

  const fetchApi = async () => {
    console.log("📡 Enviando solicitud a Gemini con:", inputText);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const contextPrompt = keywords.length ? `Contexto: ${keywords.join(', ')}.\n` : '';
      const prompt = contextPrompt + inputText;
      
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      console.log("✅ Respuesta de Gemini:", text);

      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, message: text, type: "assistant" }
      ]);
    } catch (error) {
      console.error("❌ Error en fetchApi:", error);
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      console.log("✉️ Enviando mensaje:", inputText);

      const newMessage: Message = {
        id: messages.length + 1,
        message: inputText,
        type: 'user'
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText(''); // Limpia el input después de enviar

      await fetchApi();
    }
  };

  return (
    <View className='flex flex-col h-full p-4'>
      <Button title="Cargar Archivo Excel" onPress={pickDocument} />

      <FlatList 
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
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
          <Button title='Enviar' onPress={handleSendMessage} />
        </View>
      </View>
    </View>
  );
}*/



import BubbleMessages from '@/components/BubbleMessages';
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { View, FlatList, TextInput, Button, Alert, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory-native"; //Generan gráficos de barras.

interface Message {
  id: number;
  message: string;
  type: "user" | "assistant";
  chartData?: { x: string; y: number }[];
}

const genAI = new GoogleGenerativeAI("AIzaSyCT9Ex8v6Njg7fGvVPOuq9v5M3T_DyS0yM");

export default function ChatWithExcel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);

  // Función para seleccionar y leer el archivo Excel
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel"
        ],
        copyToCacheDirectory: true
      });

      if (result.canceled || !result.assets) return;

      const uri = result.assets[0].uri;
      const fileContent = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      processExcel(fileContent, 'base64');
    } catch (error) {
      Alert.alert('Error', 'No se pudo leer el archivo');
      console.error(error);
    }
  };

  // Función para procesar el archivo Excel y generar datos para el gráfico
  const processExcel = (fileContent: string, type: string) => {
    try {
      const workbook = XLSX.read(fileContent, { type });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      const countMap: Record<string, number> = {};
      data.forEach((row: any) => {
        if (row.keywords) {
          countMap[row.keywords] = (countMap[row.keywords] || 0) + 1;
        }
      });

      const formattedData = Object.keys(countMap).map(keyword => ({
        x: keyword,
        y: countMap[keyword],
      }));

      setChartData(formattedData);
      setKeywords(Object.keys(countMap));
      Alert.alert("Éxito", "Archivo procesado correctamente");
    } catch (error) {
      Alert.alert('Error', 'No se pudo procesar el archivo');
      console.error(error);
    }
  };

  // Función para obtener la respuesta de la IA y generar gráfico si es necesario
  const fetchApi = async () => {
    console.log("📡 Enviando solicitud a Gemini con:", inputText);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const contextPrompt = keywords.length ? `Contexto: ${keywords.join(', ')}.\n` : '';
      const prompt = contextPrompt + inputText;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      console.log("✅ Respuesta de Gemini:", text);

      let newMessage: Message = {
        id: messages.length + 1,
        message: text,
        type: "assistant",
      };

      // Si el usuario pregunta por porcentajes o estadísticas, agrega el gráfico, decide si se debe mostrar el gráfico de barras en la conversación.
      if (inputText.toLowerCase().includes("porcentaje") || inputText.toLowerCase().includes("estadísticas")) {
        newMessage.chartData = chartData;
      }

      setMessages(prevMessages => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("❌ Error en fetchApi:", error);
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      console.log("✉️ Enviando mensaje:", inputText);

      const newMessage: Message = {
        id: messages.length + 1,
        message: inputText,
        type: 'user'
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText(''); // Limpia el input después de enviar

      await fetchApi();
    }
  };

  return (
    <View className='flex flex-col h-full p-4'>
      <Button title="Cargar Archivo Excel" onPress={pickDocument} />

      <FlatList 
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <BubbleMessages message={item.message} type={item.type} />
            {item.chartData && (
              <ScrollView horizontal>
                <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                  <VictoryAxis
                    tickFormat={(t) => t.length > 10 ? `${t.substring(0, 10)}...` : t}
                    style={{ tickLabels: { angle: -45, fontSize: 10 } }}
                  />
                  <VictoryAxis dependentAxis />
                  <VictoryBar
                    data={item.chartData}
                    style={{ data: { fill: "#4CAF50" } }}
                  />
                </VictoryChart>
              </ScrollView>
            )}
          </View>
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
          <Button title='Enviar' onPress={handleSendMessage} />
        </View>
      </View>
    </View>
  );
}

