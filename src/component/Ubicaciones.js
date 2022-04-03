import React,{useEffect, useState} from "react";
import { StyleSheet, Text, View, Button, FlatList, StatusBar,SectionList, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';




const Ubicaciones = () =>{
  const[ Ubicaciones, setUbicaciones] = useState([])
  useEffect(()=>{
    const obtenerUser= async()=>{    
    try {
      const url = `http://192.168.1.248:4000/uber/api/ubicaciones/`
      const respuesta = await fetch(url)
      const resultado = await respuesta.json();
      setUbicaciones(resultado.data)
      console.log(Ubicaciones)
      
    } catch (error) {
      console.log(error)
    }

    }
    obtenerUser();
  },[])

  

  return (
    <View style ={styles.container}>
      <View style={styles.contenedorHeader}>
        <Text style={styles.TextTitulo}>Ubicaciones</Text>
      </View>
      
      <View style={styles.contenedorLista}>
      <View style={styles.lista}>
      </View>
      </View>
      <View style={styles.container2}>
      <Button color={"#0073e6"} title="Guardar Ubicacion"/>
      <ScrollView >
      {Ubicaciones.map(ubicacion=>(
            <>  
             <SectionList 
            sections={[
              {title: 'ID: ', data: [ubicacion.id]},
              {title: 'Nombre: ', data: [ubicacion.nombre]},
            
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
            key={ubicacion.id}
          />

          <Button color={"#02a33d"} title="Editar Ubicacion"/>
          <Button color={"#fc0303"} title="Eliminar Ubicacion"/>
          </>
        
           
           
        ))}
        </ScrollView>
        
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
    backgroundColor: '#fff',
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
 
  });

  export default Ubicaciones;