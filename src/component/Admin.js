import React from 'react'
import { Text , View , StyleSheet , Alert } from 'react-native';

const Admin = () => {
  return (
      <>

        <View style={[styles.contenedorEncabezado , styles.sombra]}>
            <Text style={styles.encabezado}>Panel de Administración de Uber</Text>
        </View>

        <Text style={styles.h2}>Acciones CRUD</Text>

        <View style={[styles.contenedor , styles.sombra]}>
            <View style={styles.contenedorAcciones}>
                <Text style={styles.accion} >Ubicaciones</Text>
                <Text style={styles.accion} >Tipo de Vehículo</Text>
                <Text style={styles.accion} >Pasajeros</Text>
                <Text style={styles.accion} >Conductores</Text>
            </View>
        </View>

        <View style={styles.footer}>
            <Text 
                style={styles.boton}
                onPress= {() => Alert.alert('Cerrando' , 'cerrando...')}
            >Cerrar Sesión
            </Text>  
        </View>

    </>
  )
}


const styles = StyleSheet.create({
    encabezado : {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '700',
        color: '#000',
        textTransform: 'uppercase'
    },
    contenedorEncabezado: {
        backgroundColor: '#f3f4f6',
        margin: 10,
        padding: 6,
        borderRadius: 6,
        marginBottom: 10,
        marginTop: 30
    } ,
    sombra: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    contenedor: {
        width: '94%',
        height:400,
        margin: 10,
        backgroundColor: '#f3f4f6',
        borderRadius: 6,
        display:'flex',
        alignItems:'center'
    },
    h2: {
        textAlign: 'center',
        color: '#1d4ed8',
        fontSize: 30,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    contenedorAcciones : {
        width: '90%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',

    
    },
    accion: {
        backgroundColor: '#1d4ed8',
        padding: 9,
        fontSize: 15,
        color: '#fff',
        borderRadius: 5,
        width: 300,
        textAlign: 'center',
        fontWeight: '700',
        textTransform: 'uppercase'

    },
    footer: {
        width: '100%',
        display:'flex',
        alignItems: 'center'
    },
    boton: {  
        paddingHorizontal:28,
        paddingVertical:13,
        backgroundColor: '#38bdf8',
        color: '#fff',
        fontSize: 16,
        borderRadius: 5,
        fontWeight: '700',
        textTransform: 'uppercase'
    }
})

export default Admin;