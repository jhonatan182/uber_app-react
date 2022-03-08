import { useState} from 'react';
import React from 'react';
import { StyleSheet, Text, View , Button, TextInput , Image , ImageBackground , Alert} from 'react-native';

export default function recuContra () {

    return(
        <View style={styles.container}>
            <View style={styles.contenedorRecuComntra}>
                <View style={styles.contenedorTitulo}>
                    <Text style={styles.textoTitulo}>Recuperar Contraseña</Text>
                </View>
                <View style={[styles.contenedorControles, styles.sombraControles]}>
                    <View style={styles.controles}>
                        <TextInput style={styles.bordes}
                            placeholder='Ingrese su correo electronico'
                        ></TextInput>
                    </View>
                    <View style={styles.controles}>
                        <Text>Para ayudarle a recuperar su cuenta porfavor ingrese los datos pedidos</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: "center"
    },

    contenedorRecuComntra: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 520,
        width: 360
    },

    contenedorTitulo: {
        borderRadius: 10,
        marginTop: 40,
        marginBottom: 40
    },

    textoTitulo:{
        alignItems: "center",
        color: "#13161D",
        fontSize: 40,
        fontWeight: "bold"
    },

    contenedorControles:{
        flex: 3,
        flexDirection: "column",
        borderTopColor: "#fffafa",
        backgroundColor: "#f5f5f5",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: "#ffebcd",
        padding: 10
    },

    sombraControles:{
        shadowColor: "#696969",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3
    },

    controles:{
        marginBottom: 40,
        padding: 20,
        borderRadius: 23,
    },

    bordes: {
        borderColor: "#000000",
    }
});