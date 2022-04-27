import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import Detalhes from './screens/Detalhes';
const Stack = createNativeStackNavigator();
const screenOptions={
        headerShown:false,
    };
export default function App() {
  return (
    <NavigationContainer>      
        <Stack.Navigator initialRouteName='Login' screenOptions={screenOptions}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};