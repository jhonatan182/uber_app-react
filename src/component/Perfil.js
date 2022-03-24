//import { useState } from 'react';
import imagenUsuario from '../../assets/default-user.jpg';
import { StyleSheet, Text, View , Button , Image } from 'react-native';


const Perfil = ({navigation}) =>{
    return (
        <View style={styles.container}>
      <View style={styles.contenedorHeader}>
        <Text style={styles.TextTitulo}>Perfil</Text>
      </View>
      <View style={styles.contenedorInfo}>
        <View style={styles.contenedorImagen}>
        <Image source={imagenUsuario} style={styles.imagen}/>
        <Text style={styles.textUsuario}>Nombre Usuario</Text>
        <Button title="Modificar Perfil" color="#828282" onPress={()=>navigation.navigate('EditarUsuario')}></Button>
        </View>
        <View style={styles.ContenedorExtras}>
          <View style={styles.extras}>
            <Text style={styles.textExtra}>Mis Viajes</Text>
          </View>
          <View style={styles.extras}>
            <Text style={styles.textExtra}>Cerrar Sesión</Text>
          </View>
        </View>
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
    height: 60,
    padding: 5
  },
  TextTitulo:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#ffff'
  },
  contenedorInfo: {
    flex: 2,
    backgroundColor: '#fff',
    width: "100%",
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  contenedorImagen: {
    flex:2,
    width: "50%",
    height: 270,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    top: 10,
    margin: 10,
  }, 
  imagen: {
    width:150, 
    height:150,
    borderRadius: 200/2, 
  },
  textUsuario: {
    fontSize: 16,
    color: "#000",
    fontWeight: 'bold',
  },
  ContenedorExtras: {
    width: "100%",
    position: 'absolute',
    top: 300,
  },
  extras: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.5)',
  },
  textExtra: {
    fontSize: 25,
    marginLeft: 20,
    marginBottom: 15,
    marginTop: 15,
  },
});


export default Perfil;