import { useState } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';
import { BarChart } from 'react-native-chart-kit'; // Importa la librería de gráficos

export default function About() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
    }],
  });

  // Función para seleccionar un archivo Excel
  const seleccionarArchivo = async () => {
    try {
      setLoading(true);

      // Abre el explorador de archivos
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Archivos .xlsx
      });

      if (result.canceled) {
        setLoading(false);
        return;
      }

      // Leer el archivo seleccionado
      const fileUri = result.assets[0].uri;
      const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });

      // Convertir a hoja de cálculo
      const workbook = XLSX.read(fileContent, { type: 'base64' });
      const sheetName = workbook.SheetNames[0]; // Tomar la primera hoja
      const sheet = workbook.Sheets[sheetName];

      // Convertir a JSON y filtrar solo las columnas necesarias
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      const filteredData = jsonData.map(row => ({
        id: row.id,
        keywords: row.keywords,
      }));

      // Seleccionar una muestra aleatoria de 500 filas
      const randomSample = filteredData
        .sort(() => 0.5 - Math.random())
        .slice(0, 500);

      // Contar la frecuencia de las keywords
      const keywordCounts = {};
      randomSample.forEach(row => {
        const keyword = row.keywords.toLowerCase();
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });

      // Formatear los datos para la gráfica de barras
      const labels = Object.keys(keywordCounts);
      const dataCounts = Object.values(keywordCounts);

      setData(randomSample);
      setBarChartData({
        labels,
        datasets: [{
          data: dataCounts,
        }],
      });
      setLoading(false);
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      <View className="flex flex-col items-center">
        <Text className="text-xl mt-4">Cargar Excel y Extraer Datos</Text>

        <Button title="Seleccionar Archivo Excel" onPress={seleccionarArchivo} />

        {loading && <ActivityIndicator size="large" color="blue" className="mt-4" />}

        {data.length > 0 && (
          <View className="mt-4">
            <Text className="font-bold text-lg">Muestra de datos:</Text>
            {data.slice(0, 10).map((item, index) => (
              <Text key={index}>{`ID: ${item.id}, Keywords: ${item.keywords}`}</Text>
            ))}
          </View>
        )}

        {/* Agregar el gráfico de barras */}
        {barChartData.labels.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text className="font-bold text-lg">Gráfico de Frecuencia de Keywords</Text>
            <BarChart
              data={barChartData}
              width={350}
              height={220}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              fromZero={true}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}