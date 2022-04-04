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
import Ubicaciones from './Ubicaciones';
import FormTipoV from './FormTipoV';
import EditarTipoV from './EditarTipoV';
import GuardarUbicacion from './GuardarUbicacion';
import Conductor from './Conductor';
import Pasajeros from './Pasajeros';
import Pasajero from './EditarEstado';
import Conductores from './Conductores';
import PerfilConductor from './PerfilConductor';
import MiVehiculo from './MiVehiculo';


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
                <Stack.Screen options={{headerShown: false}} name="Ubicaciones" component={Ubicaciones}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="GuardarUbicacion" component={GuardarUbicacion}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="FormTipoV" component={FormTipoV}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="EditarTipoV" component={EditarTipoV}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="Conductor" component={Conductor}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="Pasajeros" component={Pasajeros}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="Pasajero" component={Pasajero}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="Conductores" component={Conductores}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="PerfilConductor" component={PerfilConductor}></Stack.Screen>
                <Stack.Screen options={{headerShown: false}} name="MiVehiculo" component={MiVehiculo}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>

    )
}