import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);

  // Cargar datos al entrar en Home
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadExpenses();
    });

    return unsubscribe;
  }, [navigation]);

  const loadExpenses = async () => {
    const stored = await AsyncStorage.getItem("@expenses");
    setExpenses(stored ? JSON.parse(stored) : []);
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        padding: 15,
        marginVertical: 5,
        backgroundColor: "#eee",
        borderRadius: 8,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
      <Text>Monto: ${item.amount.toFixed(2)}</Text>
      <Text>Fecha: {item.date}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 15 }}>
        Lista de gastos
      </Text>

      <Button
        title="Agregar nuevo gasto"
        onPress={() => navigation.navigate("AddExpense")}
      />

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}
