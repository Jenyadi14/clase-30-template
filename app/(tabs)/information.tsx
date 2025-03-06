/*import React, { useState } from 'react';
import { View, Text, Button, Alert, Platform, Dimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import {
    BarChart,
  } from "react-native-chart-kit";
function Information() {
    const [counts, setCounts] = useState({ Luisa: 0, Noboa: 0 });

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: [''],
                copyToCacheDirectory: true
            });

            if (result.canceled || !result.assets) return;

            const uri = result.assets[0].uri;

            if (Platform.OS === 'web') {
                const response = await fetch(uri);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.readAsBinaryString(blob);
                reader.onloadend = () => processExcel(reader.result);
            } else {
                const { readAsStringAsync, EncodingType } = await import('expo-file-system');
                const fileContent = await readAsStringAsync(uri, { encoding: EncodingType.Base64 });
                processExcel(fileContent, 'base64');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo leer el archivo');
            console.error(error);
        }
    };

    const processExcel = (fileContent, type = 'binary') => {
        try {
            const workbook = XLSX.read(fileContent, { type });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);

            const keywordCounts = { Luisa: 0, Noboa: 0 };

            data.forEach(row => {
                if (row.keywords) {
                    const value = String(row.keywords).toLowerCase();
                    if (value.includes('luisa')) keywordCounts.Luisa++;
                    if (value.includes('noboa')) keywordCounts.Noboa++;
                }
            });

            setCounts(keywordCounts);
        } catch (error) {
            Alert.alert('Error', 'No se pudo procesar el archivo');
            console.error(error);
        }
    };

    return (
        <View style={{ padding: 20, alignItems: 'center' }}>
            <Button title="Seleccionar Archivo" onPress={pickDocument} />
            
            <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>
                Resultados:
            </Text>
            <Text>Luisa: {counts.Luisa}</Text>
            <Text>Noboa: {counts.Noboa}</Text>

            <BarChart
                data={{
                    labels: ['Luisa', 'Noboa'],
                    datasets: [{ data: [counts.Luisa, counts.Noboa] }]
                }}
                width={Dimensions.get('window').width - 40}
                height={250}
                yAxisLabel=""
                chartConfig={{
                    backgroundColor: '#e3e3e3',
                    backgroundGradientFrom: '#f7f7f7',
                    backgroundGradientTo: '#d6d6d6',
                    decimalPlaces: 0,
                    color: (opacity = 1) => rgba(0, 122, 255, ${opacity}),
                    labelColor: (opacity = 1) => rgba(0, 0, 0, ${opacity}),
                }}
                verticalLabelRotation={30}
                showValuesOnTopOfBars
            />
        </View>
    );
}

export default Information; */


import React, { useState } from 'react';
import { View, Text, Button, Alert, Platform, Dimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import { BarChart } from "react-native-chart-kit";

// Definimos el componente funcional Information
function Information() {
    // Definimos el estado `counts` para almacenar la cantidad de palabras clave encontradas
    const [counts, setCounts] = useState({ Luisa: 0, Noboa: 0 });

     // Función para seleccionar un documento de tipo Excel
    const pickDocument = async () => {
        try {
            // Mostramos el selector de archivos y filtramos por archivos de Excel
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
                copyToCacheDirectory: true
            });

            // Si el usuario cancela la selección, terminamos la ejecución
            if (result.canceled || !result.assets) return;

            // Obtenemos la URI del archivo seleccionado
            const uri = result.assets[0].uri;

            // Manejo de la lectura del archivo dependiendo de la plataforma
            if (Platform.OS === 'web') {
                //Para la web, obtenemos el archivo como un blob (objeto que represa archivos en la web) y lo leemos como binario
                const response = await fetch(uri);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.readAsBinaryString(blob);
                reader.onloadend = () => processExcel(reader.result, 'binary');
            } else {
                // Para dispositivos móviles, leemos el archivo en formato base64
                const fileContent = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
                processExcel(fileContent, 'base64');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo leer el archivo. Asegúrate de seleccionar un archivo válido.');
            console.error(error);
        }
    };

    // Función para procesar el archivo Excel y contar las palabras clave
    const processExcel = (fileContent, type) => {
        try {
            const workbook = XLSX.read(fileContent, { type });
            const sheetName = workbook.SheetNames[0]; // Obtenemos el nombre de la primera hoja
            const sheet = workbook.Sheets[sheetName]; // Obtenemos los datos de la hoja
            const data = XLSX.utils.sheet_to_json(sheet); // Convertimos la hoja a formato JSON

            // Inicializamos un contador para las palabras clave
            const keywordCounts = { Luisa: 0, Noboa: 0 };

            data.forEach(row => {
                if (row.keywords) {
                    // Convertimos el valor a minúsculas para hacer la búsqueda insensible a mayúsculas
                    const value = String(row.keywords).toLowerCase();
                    if (value.includes('luisa')) keywordCounts.Luisa++;
                    if (value.includes('noboa')) keywordCounts.Noboa++;
                }
            });

            // Actualizamos el estado con los conteos obtenidos
            setCounts(keywordCounts);
        } catch (error) {
            Alert.alert('Error', 'No se pudo procesar el archivo. Verifica el formato de las columnas.');
            console.error(error);
        }
    };

    return (
        <View style={{ padding: 20, alignItems: 'center' }}>
            <Button title="Seleccionar Archivo" onPress={pickDocument} />
            
            <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>
                Resultados:
            </Text>
            <Text>Luisa: {counts.Luisa}</Text>
            <Text>Noboa: {counts.Noboa}</Text>

        
            <BarChart
                data={{
                    labels: ['Luisa', 'Noboa'],
                    datasets: [{ data: [counts.Luisa, counts.Noboa] }]
                }}
                width={Dimensions.get('window').width - 40}
                height={250}
                yAxisLabel=""
                chartConfig={{
                    backgroundColor: '#e3e3e3',
                    backgroundGradientFrom: '#f7f7f7',
                    backgroundGradientTo: '#d6d6d6',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                verticalLabelRotation={30}
                showValuesOnTopOfBars
            />
        </View>
    );
}

export default Information;