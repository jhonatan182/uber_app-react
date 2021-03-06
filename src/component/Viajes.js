import React,{useEffect, useState} from "react";
import { StyleSheet, Text, Button, View,SectionList, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatearFecha } from "../helpers/formeatearFecha";


const Viajes = ({navigation}) =>{
  const[ Viajes, setViajes] = useState([]);
  const[ mensaje, setMensaje] = useState([]);
  useEffect(()=>{
    const obtenerUser= async()=>{
    let user= await AsyncStorage.getItem("usuarioAutenticado") 
    user= await JSON.parse(user)
    const {id} = user.usuario
      
    try {

      const url = `http://192.168.0.12:4000/uber/api/usuario/viajes/listarViaje?pasajeroId=${id}`

      const respuesta = await fetch(url)
      const resultado = await respuesta.json();

      if(resultado.data.length > 0) {
        setViajes(resultado.data)
      } else {
        setMensaje(resultado.msj)
      }
      
    } catch (error) {
      console.log(error)
    }

    }
    obtenerUser();
  },[])

  

  return (
    <View style ={styles.container}>
      <View style={styles.contenedorHeader}>
        <Text style={styles.TextTitulo}>Mis Viajes</Text>
      </View>
      <View style={styles.contenedorLista}>
      <View style={styles.lista}>
      </View>
      </View>
      <View style={styles.container2}>

      { Viajes.length > 0 ?  (      
        <ScrollView >
          {Viajes.map(viaje=>(
            <SectionList style = {{borderBottomWidth:5,marginTop:5,marginBottom:20}}
            sections={[
              {title: 'Direccion Inicial: ', data: [viaje.direccionInicial]},
              {title: 'Destino Final: ', data: [viaje.destinoFinal]},
              {title: 'Distancia en Km: ', data: [viaje.distancia] },
              {title: 'Fecha y Hora: ', data: [ formatearFecha(viaje.fechaHora)]},
              {title: 'Precio Viaje: ', data: ['L ' + viaje.total  ]}
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
            key={viaje.id}
          />
          ))}
        </ScrollView>) : (
          <>
              <Text style={styles.mensaje}>{mensaje}</Text>
              <Button onPress={() => navigation.navigate('Inicio') } title='Pedir un Uber' />
          </>


      )}

      </View>
      <View style = {styles.footer}>
       <Text style ={styles.textoBlanco}>Gracias por usar UBER</Text>
      </View>
    </View>
  

  );


}
const styles = StyleSheet.create({
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

},mensaje : {
  textAlign: 'center',
  fontSize: 25,
  fontWeight: '700',
  padding: 7,
  marginBottom: 30
  
}
 
  });

  export default Viajes;