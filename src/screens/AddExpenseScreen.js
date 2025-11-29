import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function AddExpenseScreen({ navigation }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const saveExpense = async () => {
    if (!name || !amount || !date) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      date,
    };

    try {
      const stored = await AsyncStorage.getItem("@expenses");
      const expenses = stored ? JSON.parse(stored) : [];

      expenses.push(newExpense);

      await AsyncStorage.setItem("@expenses", JSON.stringify(expenses));

      Alert.alert("Éxito", "Gasto guardado correctamente.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Agregar Gasto</Text>

      <Text>Nombre del gasto:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ej: Comida"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <Text>Monto:</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Ej: 10.50"
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <Text>Fecha (YYYY-MM-DD):</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="Ej: 2025-11-26"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
      />

      <Button title="Guardar" onPress={saveExpense} />
    </View>
  );
}
