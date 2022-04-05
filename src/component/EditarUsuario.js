import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert, StatusBar, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import icono from '../../assets/userIcono.png'
import lapiz from '../../assets/pencil.png'
import bandera from '../../assets/hn.png'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';

const EditarUsuario = () => {
    
    let data;
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] =  useState('');
    const [nombreTitulo , setNombreTitulo] = useState('');

    useEffect(() => {(async () => {

        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');

    })();
    }, []);

    useEffect(() => {

        const obtenerUser= async () => {

        
            let user = await AsyncStorage.getItem("usuarioAutenticado")
            user = await JSON.parse(user)
            const { id } = user.usuario;



        try {

            const url = `http://192.168.0.12:4000/uber/api/usuario/obtenerPorId?id=${id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json();
            
            // console.log(resultado.data)

            setNombre(resultado.data.nombre);
            setNombreTitulo(resultado.data.nombre + ' ' + resultado.data.apellido);
            setApellido(resultado.data.apellido);
            setTelefono(resultado.data.telefono);
            setCorreo(resultado.data.correo);
            
        } catch (error) {
            
            console.log(error)
        }
        obtenerUser();
    },[];

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
  
          if (!result.cancelled) {
            setImage(result.uri);
          }
  
          console.log(image);
          

          data = new FormData()
          data.append('img',{
              uri:image,
              type:'jpeg',
              name:'null'
          })

        
    };

    const guardarArchivo = async ()=>{



        //obteniedno el id del usuario
        let user = await AsyncStorage.getItem("usuarioAutenticado") 
        user = await JSON.parse(user)
        const {id} = user.usuario;


        //obteniendo el token
        let token = await AsyncStorage.getItem("tokenUsuario") 
        token = await JSON.parse(token)
        //console.log(token)
        try {

        const url =`http://192.168.0.12:4000/uber/api/archivos/img?id=${id}`;   

        const respuesta = await fetch(url , {
            method: 'POST',
            headers: {
              Accept : 'multipart/form-data',
              'Content-Type' : 'multipart/form-data',
              "Authorization" : `Bearer ${token}`,
            } ,
            body:{
                img : data
            }
            
          });
        await respuesta.json();

        } catch (error) {

          console.log(error);  
          
        }
    }
    

    if (hasGalleryPermission === false) {
        return <Text>No access to Gallery</Text>;
    }
    

    const handleUpdate = async () => {

        let user = await AsyncStorage.getItem("usuarioAutenticado")
        user = await JSON.parse(user)
        const { id } = user.usuario;

        if([nombre, apellido, correo ,telefono].includes('')) {
            Alert.alert('Error' , 'No puedes dejar el campo vacio');
            return;
        }

        const url = `https://62c2-190-53-93-251.ngrok.io/uber/api/conductor/modificar?id=${id}`


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
                    telefono,
                })
            });

            const {msj} = await respuesta.json();
            console.log(respuesta);
            return;

            Alert.alert('Aviso', msj);

            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <StatusBar
                animated={true}
                backgroundColor="#000"
                    />
                    <View style = {styles.header}>
                        <Text style = {styles.titulo}>Editar Cuenta</Text>
                    </View>
                    <View style = {styles.contenedorPerfil}>
                        <View style = {styles.fotoPerfil}>
                            <View>
                                <Image 
                                    source={{uri:image}}
                                    style={styles.icono}
                                />
                                <TouchableOpacity style={styles.botonEditarFoto} onPress ={()=>pickImage()} >
                                    <Image 
                                        source={lapiz}
                                        style={styles.iconoLapiz}
                                        />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.nombrePerfil} >{`${nombreTitulo}`}</Text>
                            
                        </View>
                        <Button onPress={guardarArchivo } title="Guardar mi foto" />

                        <View style = {styles.separador}></View>
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
                    </View>
            </View>
                <View style = {styles.footer}>
                    <Text style ={{color:'#fff', textAlign:'center'}}>Gracias por usar UBER</Text>
                </View>
                <View style={styles.contenedorPerfil}>
                    <View style={styles.fotoPerfil}>
                        <View>
                            <Image
                                source={icono}
                                style={styles.icono}
                            />
                            <TouchableOpacity style={styles.botonEditarFoto} >
                                <Image
                                    source={lapiz}
                                    style={styles.iconoLapiz}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.nombrePerfil} >{`${nombreTitulo}`}</Text>


                    </View>
                    <View style={styles.separador}></View>
                    <View style={styles.contenedorDato}>
                        <View>
                            <Text style={styles.label}>Nombre</Text>
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
                            <Text style={styles.label}>Apellido</Text>
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
                            <Text style={styles.label}>Numero de telefono</Text>
                            <View style={styles.imagenDato}>
                                <Image
                                    source={bandera}
                                    style={styles.imagen}
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
                            <Text style={styles.label}>Correo Electronico</Text>
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
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Gracias por usar UBER</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    fotoPerfil: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
    },  
    titulo:{
        backgroundColor:'#000',
        color:'#fff',
        fontSize:25,
        fontWeight:"100",
        padding:15
    },
    titulo: {
        backgroundColor: '#000',
        color: '#fff',
        fontSize: 25,
        fontWeight: "100",
        padding: 15
    },
    contenedorPerfil: {
        padding: 20
    },
    icono: {
        width: 90,
        height: 90,
        resizeMode: 'stretch'
    },
    botonEditarFoto: {
        marginTop: -25
    },
    iconoLapiz: {
        width: 33,
        height: 33,
        resizeMode: 'stretch',
    },
    separador: {
        borderBottomColor: '#A7A8AF',
        borderBottomWidth: 1,
        paddingVertical: 15
    },
    label: {
        fontSize: 16,
        color: '#A7A8AF',

    },
    imagen: {
        width: 40,
        height: 35,
        resizeMode: 'stretch',
        marginRight: 10
    },
    contenedorDato: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15
    },
    imagenDato: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dato: {
        marginVertical: '3%',
        fontSize: 16,
        color: '#000'
    },
    footer: {
        padding: 10,
        backgroundColor: '#000',
        width: '100%',
    },
    input: {
        width: 200,
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1,
    },
    nombrePerfil: {
        fontSize: 20,
        fontWeight: '700',
        textTransform: 'uppercase'
    }
})

export default EditarUsuario;