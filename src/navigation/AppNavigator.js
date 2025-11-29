import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddExpenseScreen from '../screens/AddExpenseScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: "Mi Billetera" }}
        />

        <Stack.Screen 
          name="AddExpense" 
          component={AddExpenseScreen}
          options={{ title: "Nuevo Gasto" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
