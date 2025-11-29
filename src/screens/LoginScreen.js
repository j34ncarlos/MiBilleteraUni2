import { useEffect, useState } from "react";
import { View, Text, Button, Alert, ActivityIndicator } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function LoginScreen({ navigation }) {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    authenticate();
  }, []);

  // Autenticación biométrica
  const authenticate = async () => {
    setChecking(true);

    // Verificar si el dispositivo soporta biometría
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert("Error", "Tu dispositivo no soporta biometría.");
      setChecking(false);
      return;
    }

    // Verificar si el usuario tiene huella/rostro registrado
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      Alert.alert("Error", "No hay datos biométricos registrados.");
      setChecking(false);
      return;
    }

    // Intentar autenticar
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autentícate para continuar",
      fallbackLabel: "Usar PIN",
    });

    setChecking(false);

    if (result.success) {
      navigation.replace("Home");
    } else {
      Alert.alert("Error", "Autenticación cancelada o fallida.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Biometría</Text>

      {checking ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Intentar de nuevo" onPress={authenticate} />
      )}
    </View>
  );
}
