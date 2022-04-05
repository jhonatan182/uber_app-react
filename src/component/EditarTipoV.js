import React, {useEffect,useState} from "react";
import { StyleSheet, Text, View, Button, Alert, StatusBar, Image,TouchableOpacity,ScrollView, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditarTipoV = ({navigation}) => {

    const [tipo, setTipo] = useState('');
    const [id , setId] = useState(0);

    useEffect(() => {

        
        const obtenerTipoVehiculo= async () => {

        
            let Vehiculo = await AsyncStorage.getItem('TipoVehiculo');
            Vehiculo = await JSON.parse(Vehiculo);
            setTipo(Vehiculo.tipo);
            setId(Vehiculo.id)
                        
        }
        obtenerTipoVehiculo();
        
    },[])

    const tipoVUpdate = async (navigation) => {
        if([tipo].includes('')) {
            Alert.alert('Error' , 'No puedes dejar el campo vacio');
            return;
          }
        
        const url = `http://192.168.0.12:4000/uber/api/vehiculo/tipo/modificar?id=${id}`

        try {
            const respuesta = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   tipo
                })
            });

            const resultado = await respuesta.json();

            Alert.alert('Exito', resultado);
            navigation.navigate('TipoVehiculos')
           
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
                        <Text style = {styles.titulo}>Editar Tipo Vehiculos</Text>
                    </View>
                    <View style = {styles.contenedorPerfil}>
                        
                       
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Tipo de Vehiculo</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={tipo}
                                        onChangeText={text => setTipo(text)}
                                    />
                                
                            </View>
                           
                        </View>
                        
                       
                        
                    </View>
            </View>
            <View style={styles.botoned}>
                <Button
                    title="Editar"
                    color={'#0000FF'}
                    onPress={() =>tipoVUpdate(navigation)} 
                    
                                />
            </View>
            <View style={styles.botonel}>
                <Button onPress={() => navigation.navigate('TipoVehiculos')}
                    title="Atras"
                    color={'#999999'}
                    
                                />
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
    separador:{
        borderBottomColor: '#A7A8AF',
        borderBottomWidth: 1,
        paddingVertical:40
    },
    titulo:{
        backgroundColor:'#000',
        color:'#fff',
        fontSize:25,
        fontWeight:"100",
        padding:15
    },
    contenedorPerfil:{
        marginTop: 60,
        padding:20
        
    },
    icono:{
        width:90,
        height:90,
        resizeMode:'stretch'
    },
   
    label:{
        fontSize:16,
        color:'#000000',
        marginLeft: '4%'
    },
    
    contenedorDato:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:100
    },
    botoned:{
        width:'80%',
        marginVertical: 15,
        marginLeft: '10%'
        
    },
    botonel:{
        width:'80%',
        marginLeft: '10%'
    },
    footer:{
        padding:10,
        backgroundColor:'#000',
        width:'100%',
        marginTop: 210,
        
    },
    input: {
        width: 350,
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



export default EditarTipoV;