import { useState} from 'react';
import React from 'react';
import { StyleSheet, Text, View , Button, TextInput , Image , ImageBackground , Alert} from 'react-native';

export default function RecuContra ({navigation}) {
    const [correo , setCorreo] = useState('');

    const handleRecuperarContrasenia = async () => {

        if(correo === '') {
            Alert.alert('Error','Escribe tu correo electronico');
            return;
        }

        try {
            const url ='http://192.168.0.12:4000/uber/api/autenticacion/recuperar-contrasena';

            const respuesta = await fetch(url ,{
                method: 'POST',
                body: JSON.stringify({correo}),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });

            const resultado = await respuesta.json();
            const {data ,msj} = resultado;

            if(data === 400) {
                Alert.alert('Error', msj);

            } else if(data === 200 ) {
                Alert.alert('Confirmación de correo', msj);
                setCorreo('');
            }



        } catch (error) {
            console.log(error);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.contenedorRecuComntra}>
                <View style={styles.contenedorTitulo}>
                    <Text style={styles.textoTitulo}>Recuperar Contraseña</Text>
                </View>
                <View style={[styles.contenedorControles, styles.sombraControles]}>
                    <View style={styles.controles}>
                        <TextInput 
                            style={styles.input}
                            placeholder='Ingrese su correo electronico'
                            keyboardType='email-address'
                            value={correo}
                            onChangeText ={ text => setCorreo(text) }
                        ></TextInput>
                        <Button 
                            title='Recuperar mi contraseña'
                            color = '#000'
                            onPress={ handleRecuperarContrasenia }
                        />
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

    input: {
        backgroundColor: '#e3e3e3',
        color: '#000',
        paddingHorizontal: 25,
        paddingVertical: 15,
        width: '100%',
        marginBottom: 60
    }
});