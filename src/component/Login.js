import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View , Button, TextInput , Image , ImageBackground , Alert} from 'react-native';
import imagenLogo from '../../assets/uber.png';
import imagenFondo from '../../assets/fondo.jpg';

const Login = ({navigation}) => {

  const [correo , setCorreo] = useState('');
  const [password , setPassword] = useState('');
  

  const handleLogIn = async () => {

    if([correo , password].includes('')) {
      Alert.alert('Error' ,'Ingresa tus credenciales para continuar');
      return;
    } 

    const url ='http://192.168.1.3:4000/uber/api/autenticacion/inicio-sesion/';

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
        

        const usuarioAutenticado = resultado.data;

        await AsyncStorage.setItem('usuarioAutenticado', JSON.stringify(usuarioAutenticado));

        Alert.alert('Inicio de sesion exitoso' , `Bienvenido de nuevo ${nombre} ${apellido} `);
        
        setCorreo('');
        setPassword('');

        /* de acuerdo al tipo de usuario se va mostrar x pantalla */

        // conductor
        if(usuarioAutenticado.usuario.tipoUsuario === 1) {
          navigation.navigate('PerfilConductor');

          //pasajero
        } else if(usuarioAutenticado.usuario.tipoUsuario === 2) {
          navigation.navigate('Inicio');

          //admin
        } else {
          navigation.navigate('Admin');
        }

      }

    } catch (error) {
      console.log(error);
      Alert.alert('Error!', 'Hubo un problema con la conexion');
    }

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
          <Text style= {styles.label} > Correo: </Text>
          <TextInput
            onChangeText={ text => setCorreo(text) }
            value={correo}
            style = {styles.input}
            placeholder='Ingrese su Correo'
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
            onPress={() => navigation.navigate('RecuContra')}
            style={styles.nuevaContrasena}>Olvidé mi contraseña.
          </Text>

          </View>

          <View  style={styles.signup}>
            <Text 
              style={{marginBottom: 12}}>¿Aún no tienes una cuenta?   
              <Text style={{fontWeight: '700'}}> Comienza creando una
              </Text> 
            </Text>
            <Button 
              onPress={() => navigation.navigate('SignUp')}
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