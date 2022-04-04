import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const EditarEstado = ({ editarUsuario , setEditando , setEditarUsuario}) => {

    const [estadoUsuario , setEstadoUsuario] = useState('');
    const [nuevoEstado , setnuevoEstado] = useState('');

    useEffect(() => {

        setEstadoUsuario(editarUsuario.estado)

    }, [])


    const handleEditarEstado = async () => {

        if(estadoUsuario === nuevoEstado) {
            Alert.alert('Advertencia' ,'El estado que elegiste coincide con el actual');
            return
        } 

        try {

            const url = `http://192.168.0.12:4000/uber/api/conductor/modificarEstado?id=${editarUsuario.id}`;
            const respuesta = await fetch(url ,{
                method: 'PUT',
                body: JSON.stringify({estado: nuevoEstado}),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });

            await respuesta.json();

            Alert.alert('Correcto' , 'Registro actualizado');

        } catch (error) {
            console.log(error);
        }

    }

    const volverAtras = () => {
        setEditarUsuario({});
        setEditando(false);
    }

    return (
        <>
            <View style={[styles.contenedorEncabezado, styles.sombra]}>
                <Text style={styles.encabezado}>Editando: {`${editarUsuario.nombre} ${editarUsuario.apellido} `}</Text>
            </View>

            <ScrollView>
                <View
                    style={[styles.contenedor, styles.sombra]}
                >
                    <View style={styles.contenedorAcciones}>

                    <View style={styles.campo}>
                        <Text style={styles.titulo}>
                            Estado actual del Usuario:
                        </Text>
                        <Text style={styles.info}>
                            {estadoUsuario}
                        </Text>
                    </View>

                        <View style={styles.campo}>
                        <Text style={styles.titulo}>Cambio de estado: </Text>
                        <RNPickerSelect
                          placeholder = {{
                              label: 'Cambia el estado del Usuario',
                              value: null,
                              color: '#3b3b3b',}
                          }
                          style={pickerSelectStyles}
                          value ={estadoUsuario}
                          onValueChange={ value => setnuevoEstado(value) }
                          items= {[
                            {key: 1 , label: 'Activo' , value: 'activo'},
                            {key: 2 , label: 'Inactivo' , value: 'inactivo'},
                          ]}
                        />
                        </View>

                        <View style={styles.centrar}>
                            <Text
                                style={styles.botonEditar}
                                onPress={handleEditarEstado}
                                
                            >
                                Editar Usuario
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Text
                    style={styles.boton}
                    onPress={ volverAtras }
                >
                    Atras
                </Text>
            </View>
        </>
    );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: '#3b3b3b',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#3b3b3b',
    borderRadius: 8,
    color: '#3b3b3b',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
    encabezado: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "700",
        color: "#000",
        textTransform: "uppercase",
    },
    contenedorEncabezado: {
        backgroundColor: "#f3f4f6",
        margin: 10,
        padding: 6,
        borderRadius: 6,
        marginBottom: 10,
        marginTop: 30,
    },
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
        width: "94%",
        height: 250,
        margin: 10,
        backgroundColor: "#f3f4f6",
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
    },
    contenedorAcciones: {
        width: "90%",
        height: "100%",
        display: "flex",
    },
    footer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#374151",
    },
    boton: {
        paddingHorizontal: 28,
        paddingVertical: 13,
        backgroundColor: "#dc2626",
        color: "#fff",
        fontSize: 16,
        borderRadius: 5,
        fontWeight: "700",
        textTransform: "uppercase",
        marginVertical: 6,
    },
    titulo: {
        color: "#000",
        fontWeight: "700",
        fontSize: 22,
    },
    info: {
        color: "#000",
        fontSize: 20,
    },
    campo: {
        marginBottom: 20,
        marginTop: 5,
    },
    centrar: {
        display: "flex",
        alignItems: 'center',
    },
    botonEditar: {
        backgroundColor: "#1d4ed8",
        color: "#fff",
        padding: 10,
        borderRadius: 5,
        fontWeight: "700",
    },
});

export default EditarEstado;
