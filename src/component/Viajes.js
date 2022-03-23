import React from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from "react-native";


const Viajes = () =>{
  return (
    <View style ={styles.container}>
      <View style={styles.contenedorHeader}>
        <Text style={styles.TextTitulo}>Mis Viajes</Text>
      </View>
      <View style={styles.contenedorLista}>
      <View style={styles.lista}>
      <Text style = {styles.textoBlanco}>Lista de Viajes</Text>
      </View>
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
    bottom: 340

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
  top: 375
},
 
  });

  export default Viajes;