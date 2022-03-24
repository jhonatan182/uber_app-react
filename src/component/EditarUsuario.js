import React from "react";
import { StyleSheet, Text, View, Button, Alert, StatusBar, Image,TouchableOpacity,ScrollView, TextInput } from 'react-native';
import icono from '../../assets/userIcono.png'
import lapiz from '../../assets/pencil.png'
import bandera from '../../assets/hn.png'
import google from '../../assets/google.png'
import facebook from '../../assets/facebook.png'
import { useState } from "react";

const EditarUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] =  useState('');
    const [password, setPassword] = useState('');

    const handleUpdate = async () => {
        if([nombre, apellido, correo , password ,telefono].includes('')) {
            Alert.alert('Error' , 'No puedes dejar el campo vacio');
            return;
          }

        const url = 'http://192.168.0.3:4000/uber/api/conductor/modificar';

        try {
            const respuesta = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    correo,
                    password,
                    telefono,
                })
            });

            const {msj} = await respuesta.json();

            Alert.alert('Aviso' , msj);

            setNombre('');
            setApellido('');
            setCorreo('');
            setPassword('');
            setTelefono('');
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <ScrollView style={styles.scrollView}>
            <View style = {styles.container}>
                <StatusBar
                animated={true}
                backgroundColor="#000"
                    />
                    <View style = {styles.header}>
                        <Text style = {styles.titulo}>Editar Cuenta</Text>
                    </View>
                    <View style = {styles.contenedorPerfil}>
                        <View style = {styles.fotoPerfil}>
                            <Image 
                                    source={icono}
                                    style={styles.icono}
                                />
                                <TouchableOpacity
                                style={styles.botonEditarFoto}
                                >
                                <Image 
                                    source={lapiz}
                                    style={styles.iconoLapiz}
                                />
                                </TouchableOpacity>
                                <View style = {styles.separador}></View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Nombre</Text>
                                <TextInput
                                    style={styles.input}
                                    value={nombre}
                                    onChangeText={text => setNombre(text)}
                                />
                            </View>
                            <View>
                                <Button
                                    title="Editar"
                                    color={'#000'}
                                    onPress={handleUpdate}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Apellido</Text>
                                <TextInput
                                    style={styles.input}
                                    value={apellido}
                                    onChangeText={text => setApellido(text)}
                                />
                            </View>
                            <View>
                                <Button
                                    title="Editar"
                                    color={'#000'}
                                    onPress={handleUpdate}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Numero de telefono</Text>
                                <View style ={styles.imagenDato}>
                                    <Image 
                                        source={bandera}
                                        style = {styles.imagen}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        value={telefono}
                                        onChangeText={text => setTelefono(text)}
                                    />
                                </View>
                            </View>
                            <View>
                                <Button
                                    title="Editar"
                                    color={'#000'}
                                    onPress={handleUpdate}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Correo Electronico</Text>
                                <TextInput
                                    style={styles.input}
                                    value={correo}
                                    onChangeText={text => setCorreo(text)}
                                />
                            </View>
                            <View>
                                <Button
                                    title="Editar"
                                    color={'#000'}
                                    onPress={handleUpdate}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Contraseña</Text>
                                <TextInput
                                    style={styles.input}
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                />
                            </View>
                            <View>
                                <Button
                                    title="Editar"
                                    color={'#000'}
                                    onPress={ handleUpdate}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Conectar con:</Text>
                                <View style ={styles.imagenDato}>
                                    <Image 
                                        source={google}
                                        style = {styles.imagen}
                                    />
                                    <Text style = {styles.dato}>Google</Text>
                                </View>
                            </View>
                            <View>
                                <Button
                                    title="Conectar"
                                    color={'#000'}
                                    onPress={() => Alert.alert('Simple Button pressed')}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Conectar con:</Text>
                                <View style ={styles.imagenDato}>
                                    <Image 
                                        source={facebook}
                                        style = {styles.imagen}
                                    />
                                    <Text style = {styles.dato}>Facebook</Text>
                                </View>
                            </View>
                            <View>
                                <Button
                                    title="Conectar"
                                    color={'#000'}
                                    onPress={() => Alert.alert('Simple Button pressed')}
                                />
                            </View>
                        </View>
                    </View>
            </View>
                <View style = {styles.footer}>
                    <Text style ={{color:'#fff', textAlign:'center'}}>Gracias por usar UBER</Text>
                </View>
        </ScrollView>
    )
    

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    titulo:{
        backgroundColor:'#000',
        color:'#fff',
        fontSize:25,
        fontWeight:"100",
        padding:15
    },
    contenedorPerfil:{
        padding:20
    },
    icono:{
        width:90,
        height:90,
        resizeMode:'stretch'
    },
    botonEditarFoto:{
        marginTop:-25
    },
    iconoLapiz:{
        width:33,
        height:33,
        resizeMode:'stretch',
    },
    separador:{
        borderBottomColor: '#A7A8AF',
        borderBottomWidth: 1,
        paddingVertical:15
    },
    label:{
        fontSize:16,
        color:'#A7A8AF',

    },
    imagen:{
        width:40,
        height:35,
        resizeMode:'stretch',
        marginRight:10
    },
    contenedorDato:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:15
    },
    imagenDato:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    dato:{
        marginVertical:'3%',
        fontSize:16,
        color:'#000'
    },
    footer:{
        padding:10,
        backgroundColor:'#000',
        width:'100%',
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1,
      },
})



export default EditarUsuario;