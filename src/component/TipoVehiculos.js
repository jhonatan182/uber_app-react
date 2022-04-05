import React,{useEffect, useState} from "react";
import { StyleSheet,Alert, Button,Text, View,SectionList, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

//import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css";



const TipoVehiculos = () =>{
  const navigation = useNavigation();
  const[ TipoVehiculos, setTipo] = useState([]);

  useEffect(()=>{
    const obtenerUser= async()=>{
    let user= await AsyncStorage.getItem("usuarioAutenticado") 
    user= await JSON.parse(user)
    const {id} = user.usuario
      
    try {
      const url = `http://192.168.0.12:4000/uber/api/vehiculo/tipo/listar`
      const respuesta = await fetch(url)
      const resultado = await respuesta.json();
      setTipo(resultado)
      console.log(TipoVehiculos)
      
    } catch (error) {
      console.log(error)
    }

    }
    obtenerUser();
  },[]);

    const eliminar = async (id)=>{
      const url = `http://192.168.0.12:4000/uber/api/vehiculo/tipo/eliminar?id=${id}`
      const res = await fetch(url, {method:'DELETE',headers:{'Content-Type':'application/json'}});
      const resultado = await res.json();
      
      Alert.alert('Notificación', resultado)
    }

    const prepararEditar = async (id) => {
      
      try {
        const url = `http://192.168.0.12:4000/uber/api/vehiculo/tipo/obtenerid?id=${id}`
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        
        const info = {
          id : resultado.data.id,
          tipo: resultado.data.tipo
        }

        await AsyncStorage.setItem('TipoVehiculo', JSON.stringify(info));
        navigation.navigate('EditarTipoV');
         
    } catch (error) {
        
        console.log(error)
    }



    }


  return (
    <View style ={stylesTipe.container}>
    <View style={stylesTipe.contenedorHeader}>
      <Text style={stylesTipe.TextTitulo}>Tipos de Vehiculos</Text>
    </View>
    <View style={stylesTipe.contenedorLista}>
    <View style={stylesTipe.lista}>
    </View>
    </View>
 
    <View style={stylesTipe.container2}>
    <Button  onPress={() => navigation.navigate('FormTipoV')} title="Agregar" color="#008000"></Button>
    <ScrollView >
    
      {TipoVehiculos.map(TipoV=>(
         <View style = {{borderBottomWidth:2,marginBottom:3}}>
         <SectionList 
         sections={[
           {title: 'ID:', data: [TipoV.id]},
           {title: 'Tipo:', data: [TipoV.tipo]}
           
         ]}
         renderItem={({item}) => <Text style={stylesTipe.item}>{item}</Text>}
         keyExtractor={(item, index) => index}
         renderSectionHeader={({section}) => <Text style={stylesTipe.sectionHeader}>{section.title}</Text>}
         key={TipoV.id}
       />
        <Button onPress={() => prepararEditar(TipoV.id)} title="Modificar" color='#000'/>
        <Button onPress={() => eliminar(TipoV.id)} title="Eliminar" color="#FF0000"/>
       </View> 
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
  paddingTop: 25,
 width:'100%'
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
  
  