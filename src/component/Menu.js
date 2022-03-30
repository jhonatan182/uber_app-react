import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Button } from 'react-native';
import Inicio from './Inicio';
import Login from './Login';
import Perfil from './Perfil';
import RecuContra from './RecuContra';
import SignUp from './SignUp';
import Viajes from './Viajes';
import EditarUsuario from './EditarUsuario';
import Admin from './Admin';
import TipoVehiculos from './TipoVehiculos';


const Stack = createNativeStackNavigator();
export default function Menu() {
    return(

        <NavigationContainer >
            <Stack.Navigator >
                <Stack.Screen options={{headerShown: false}} name="Login" component={Login}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="Inicio" component={Inicio}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="Perfil" component={Perfil}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="RecuContra" component={RecuContra}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="Viajes" component={Viajes}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="Editar" component={EditarUsuario}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="Admin" component={Admin}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="TipoVehiculos" component={TipoVehiculos}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>

    )
}