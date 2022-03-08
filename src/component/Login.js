import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View , Button, TextInput , Image , ImageBackground , Alert} from 'react-native';
import imagenLogo from '../../assets/uber.png';
import imagenFondo from '../../assets/fondo.jpg';

const Login = () => {

    const [correo , setCorreo] = useState('');
    const [password , setPassword] = useState('');
    

    const handleLogIn = async () => {
  
    if([correo , password].includes('')) {
      Alert.alert('Error' ,'Datos incorrectos');
      return;
    } 

    const url ='http://192.168.0.6:4000/uber/api/autenticacion/inicio-sesion/';

    try {
      
      const respuesta = await fetch(url , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          correo,
          password
        })
      });
      
      const resultado = await respuesta.json();

      if(resultado.data.length === 0) {
        Alert.alert('No se pudo iniciar sesion', 'Crea una cuenta para empezar o credenciales incorrectas' );

      } else {

        const {nombre ,apellido} = resultado.data.usuario;

        const usuarioAutenticado = JSON.stringify (resultado.data);
        await AsyncStorage.setItem('usuarioAutenticado', usuarioAutenticado);
        Alert.alert('Inicio de sesion exitoso' , `Bienvenido de nuevo ${nombre} ${apellido} `);
      }

    } catch (error) {
      console.log(error);
    }
      

    
    

    }

    const handleSignUp = () => {
        Alert.alert('Nueva cuenta', 'Vas a crear una nueva cuenta');
    }

    return (
        
        <ImageBackground source={imagenFondo} style={styles.container}>

        <View style={styles.imagenCaja}>
          <Image 
            source={imagenLogo}
            style={styles.imagen}
          />
        </View>

        <View style = {[styles.contenedorLogin, styles.sombras]} >

          <View style= {styles.campo} >
            <Text style= {styles.label} > Correo o Teléfono: </Text>
            <TextInput
              onChangeText={ text => setCorreo(text) }
              value={correo}
              style = {styles.input}
              placeholder='Ingrese su correo o teléfono'
              keyboardType='email-address'
              >
              
            </TextInput>
          </View>

          <View style= {styles.campo} >
            <Text style= {styles.label} > Contraseña: </Text>
            <TextInput
              onChangeText={ text => setPassword(text) }
              value={password}
              style = {styles.input}
              secureTextEntry= {true}
              placeholder='Ingrese su contraseña'
              >
              
            </TextInput>
          </View>

          <View style={styles.botones}>

            <View style={styles.login}>
              <Button 
                title='Ingresar' 
                onPress={ handleLogIn }
              />

            <Text 
              onPress={ () => Alert.alert('password','Nueva pantalla para password')} 
              style={styles.nuevaContrasena}>Olvidé mi constraseña.
            </Text>

            </View>

            <View  style={styles.signup}>
              <Text 
                style={{marginBottom: 12}}>¿Aún no tienes una cuenta? 
                <Text style={{fontWeight: '700'}} >Comienza creando una</Text> 
              </Text>
              <Button 
                onPress={ handleSignUp }
                color="#000" 
                title='Crear Cuenta' />
            </View>
            
          </View>


        </View>


    </ImageBackground>
  

    )
}


const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    imagenCaja : {
      width: 150,
      height: 150,
      
    },
    imagen: {
      width: '100%' , 
      height: '100%' , 
      borderRadius: 100
    },
    contenedorLogin: {
      marginTop: 15,
      backgroundColor: 'rgba(217, 217, 217, 0.8)',
      width: 300,
      height: 400,
      paddingTop: 20,
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 15,
      borderRadius: 10,
    },
    campo : {
      marginBottom: 20,
  
    },
    label: {
      fontSize: 18,
      fontWeight: '700',
      fontFamily: 'sans-serif',
      marginBottom: 10
    },
    input: {
      fontSize: 18,
      padding: 6,
      borderBottomWidth: 1,
    },
    login : {
      marginBottom: 18,
    },
    botones : {
      marginTop: 5
    },
    sombras : {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      
      elevation: 24,
    },
    nuevaContrasena : {
        marginTop: 15,
        fontSize: 15,
    }
    
  });
  

export default Login;