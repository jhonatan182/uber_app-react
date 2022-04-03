import React,{useEffect, useState} from "react";
import { StyleSheet, Button,Text, View,SectionList, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



const TipoVehiculos = () =>{
  const[ TipoVehiculos, setTipo] = useState([])
  useEffect(()=>{
    const obtenerUser= async()=>{
    let user= await AsyncStorage.getItem("usuarioAutenticado") 
    user= await JSON.parse(user)
    const {id} = user.usuario
      
    try {
      const url = `http://192.168.1.248:4000/uber/api/vehiculo/tipo/listar`
      const respuesta = await fetch(url)
      const resultado = await respuesta.json();
      setTipo(resultado)
      console.log(TipoVehiculos)
      
    } catch (error) {
      console.log(error)
    }

    }
    obtenerUser();
  },[])

  
  
  return (
    <View style ={stylesTipe.container}>
    <View style={stylesTipe.contenedorHeader}>
      <Text style={stylesTipe.TextTitulo}>Tipos de Vehiculos</Text>
    </View>
    <View style={stylesTipe.contenedorLista}>
    <View style={stylesTipe.lista}>
    </View>
    </View>
    <Button  title="Agregar Vehiculo" color="#008000"></Button>
    <View style={stylesTipe.container2}>
    <ScrollView >
    
      {TipoVehiculos.map(TipoV=>(
         <View><Button onPress={() => navigation.navigate('FormTipoV')} title="Modificar" color='#000' ></Button>
         <Button  title="Eliminar" color="#FF0000"></Button>
         <SectionList style = {{borderBottomWidth:5,marginTop:5,marginBottom:10}}
         sections={[
           {data: [TipoV.tipo]},
           
         ]}
         renderItem={({item}) => <Text style={stylesTipe.item}>{item}</Text>}
         keyExtractor={(item, index) => index}
         key={TipoV.id}
       /></View> 
      ))}
      
      </ScrollView>
     
    </View>
    <View style = {stylesTipe.footer}>
     <Text style ={stylesTipe.textoBlanco}>Gracias por usar UBER</Text>
    </View>
  </View>

  )}


const stylesTipe = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: '100%',
  },
  contenedorHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    width: "100%",
    height: 80,
    padding: 5,
    //bottom: 340

  },
  TextTitulo:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffff'
  },
  textoBlanco:{
    color:'#fff',
    textAlign:'center'
},
footer:{
  padding:8,
  backgroundColor:'#000',
  width:'100%',
  textAlign:'center',
  //top: 380
},
container2: {
  flex: 1,
 // paddingTop: 25,
  //width:'100%'
 },
 sectionHeader: {
  paddingTop: 2,
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 2,
  fontSize: 20,
  fontWeight: 'bold',
  backgroundColor: 'rgba(247,247,247,1.0)',
},
item: {
  padding: 10,
  fontSize: 18,
  height: 44,
},
botonesM : {
  width: 300,
  height: 90,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly'
}
  });

  export default TipoVehiculos;
  
  