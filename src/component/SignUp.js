import { useState } from 'react'
import { Text, Button , TextInput , View  , StyleSheet , ScrollView , Alert} from 'react-native';


const SignUp = ({navigation}) => {

  const [nombre , setNombre] = useState('');
  const [apellido , setApellido] = useState('');
  const [correo , setCorreo] = useState('');
  const [password , setPassword] = useState('');
  const [telefono , setTelefono] = useState('');

  const handleSubmit =  async () => {

    if([nombre, apellido, correo , password ,telefono].includes('')) {
      Alert.alert('Error' , 'Todos los campos son obligatorios');
      return;
    }

    const url ='http://192.168.1.3:4000/uber/api/usuario/guardar';

    try {
      
      const respuesta = await fetch(url , {
        method: 'POST',
        headers: {
          Accept : 'application/json',
          'Content-Type' : 'application/json'
        } ,
        body: JSON.stringify({
          nombre,
          apellido,
          correo,
          password,
          telefono,
          foto: 'perfil.png',
          tipoUsuario: 1
        })
      });

      const {msj} = await respuesta.json();

      Alert.alert('Aviso' , msj);

      setNombre('');
      setApellido('');
      setCorreo('');
      setPassword('');
      setTelefono('');


    } catch (error) {
      console.log(error);
    }

  }



  return (
       
    <View style={styles.container}>

      <Text style={styles.heading}>Crea una nueva cuenta</Text>

      <View style = {[styles.contenedorLogin, styles.sombras]} >

        <ScrollView>
          <View style= {styles.campo} >
            <Text style= {styles.label} > Nombre: </Text>
            <TextInput
                style = {styles.input}
                placeholder='Ingrese su nombre'
                value={nombre}
                onChangeText ={ text => setNombre(text) }
            >
            </TextInput>
          </View>

          <View style= {styles.campo} >
            <Text style= {styles.label} > Apellido: </Text>
            <TextInput
                style = {styles.input}
                placeholder='Ingrese tu apellido'
                value={apellido}
                onChangeText ={ text => setApellido(text) }
            >
            </TextInput>
          </View>

          <View style= {styles.campo} >
            <Text style= {styles.label} > Correo: </Text>
            <TextInput
                style = {styles.input}
                placeholder='Ingrese su correo'
                keyboardType='email-address'
                value={correo}
                onChangeText ={ text => setCorreo(text) }
            >
            </TextInput>
          </View>

          <View style= {styles.campo} >
            <Text style= {styles.label} > Contraseña: </Text>
            <TextInput
                style = {styles.input}
                placeholder='Ingrese su contraseña'
                secureTextEntry = {true}
                value={password}
                onChangeText ={ text => setPassword(text) }
            >
            </TextInput>
          </View>

          <View style= {styles.campo} >
            <Text style= {styles.label} > Teléfono: </Text>
            <TextInput
                style = {styles.input}
                placeholder='Ingrese su teléfono'
                keyboardType='numeric'
                value={telefono}
                onChangeText ={ text => setTelefono(text) }
            >
            </TextInput>
          </View>

        </ScrollView> 

      </View> 
    
      <View style={styles.botones}>
        <View >
          <Button 
            title='Crear mi cuenta'
  
            onPress={ handleSubmit }
          />
        </View>
        <View >
          <Button 
            title='Salir'
            color='#E53229'
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>


    </View> /* container */
  )
};


const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading : {
        fontSize: 40,
        textAlign: 'center',
        color: '#000',
        fontWeight : '700'
    },
    contenedorLogin: {
      marginTop: 15,
      backgroundColor: '#F0F0F0',
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
    botones : {
      width: 300,
      height: 90,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly'
    },
    
  });
  

export default SignUp;