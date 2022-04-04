import React, {useEffect,useState} from "react";
import { StyleSheet, Text, View, Button, Alert, StatusBar,ScrollView, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const MiVehiculo = ({navigation}) => {

    const [placa, setPlaca] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] =  useState('');
    const [color, setColor] = useState('');


    useEffect(() => {
        const obtenerUser= async () => {

        
        let user = await AsyncStorage.getItem("usuarioAutenticado") 
        user = await JSON.parse(user)
        const {id} = user.usuario;
        
        try {
            const url = `http://192.168.0.12:4000/uber/api/vehiculo/obtenerVehiculoPorUsuario?usuarioId=${id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json();
            

            setPlaca(resultado.placa);
            setMarca(resultado.marca);
            setModelo(resultado.modelo);
            setColor(resultado.color);
            

        
        } catch (error) {
            
            console.log(error)
        }

        }

        obtenerUser();

    },[])
    

    const handleUpdate = async () => {
        if([placa, marca, modelo ,color].includes('')) {
            Alert.alert('Error' , 'No puedes dejar el campo vacio');
            return;
          }
        try {
                    
            let user = await AsyncStorage.getItem("usuarioAutenticado") 
            user = await JSON.parse(user)
            const {id} = user.usuario;

            const url = `http://192.168.0.12:4000/uber/api/vehiculo/editar?usuarioId=${id}`;

            const respuesta = await fetch(url , {
                method: 'PUT',
                body: JSON.stringify({placa , marca , modelo , color}),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });

            await respuesta.json();

            Alert.alert('Actualización', 'Tu vehículo ha sido actualizado');

            navigation.navigate('MiVehiculo');

        } catch (error) {
            console.log(error)
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
                        <Text style = {styles.titulo}>Mi Vehículo</Text>
                    </View>
                    <View style = {styles.contenedorPerfil}>

                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Placa</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={placa}
                                        onChangeText={text => setPlaca(text)}
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
                                <Text style = {styles.label}>Marca</Text>
                                <TextInput
                                    style={styles.input}
                                    value={marca}
                                    onChangeText={text => setMarca(text)}
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
                                <Text style = {styles.label}>Modelo</Text>
                                <View style ={styles.imagenDato}>

                                    <TextInput
                                        style={styles.input}
                                        value={modelo}
                                        onChangeText={text => setModelo(text)}
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
                                <Text style = {styles.label}>Color</Text>
                                <TextInput
                                    style={styles.input}
                                    value={color}
                                    onChangeText={text => setColor(text)}
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
        </ScrollView>
    )
    

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    fotoPerfil: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
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
        marginTop: 12
    },
    input: {
        width: 200,
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1,
      },
    nombrePerfil : {
        fontSize: 20,
        fontWeight: '700',
        textTransform: 'uppercase'
    }
})



export default MiVehiculo;