import { useState, useEffect } from 'react'
import { Text, Button , TextInput , View  , StyleSheet , ScrollView , Alert} from 'react-native';
import usePickerUbicaciones from '../hooks/usePickerUbicaciones';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Conductor = ({navigation}) => {

  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');

  useEffect(() => {
    const obtenerUser= async () => {

    
    let user = await AsyncStorage.getItem("usuarioAutenticado") 
    user = await JSON.parse(user)
    const {id} = user.usuario;
    
    try {
        const url = `http://192.168.0.12:4000/uber/api/usuario/obtenerPorId?id=${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json();
        
        // console.log(resultado.data)

        setUsuarioId(resultado.data.id);
        

    } catch (error) {
        
        console.log(error)
    }

    }

    obtenerUser();

},[])

  const handleSubmit = async() =>{

    if([placa, marca, modelo, color, tipoVehiculo].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const url = 'http://192.168.0.12:4000/uber/api/vehiculo/nuevo-vehiculo';

    try{

      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          placa,
          marca,
          modelo,
          color,
          usuarioId,
          tipoVehiculo
        })
      });

      const resultado = await respuesta.json();
      
      if(resultado){
        Alert.alert('Aviso', 'Tu vehículo fue agregado correctamente');

        setPlaca('');
        setMarca('');
        setModelo('');
        setColor('');

        navigation.navigate('PaneConductor');

      }
      else{
        Alert.alert('Aviso', 'Error al guardar tu vehículo');
      }

    }catch(error){
      console.log(error);
    }

  }

    return(
        <View style={styles.container}>
            <Text style={styles.heading}>Registre su vehiculo</Text>
            
            <View style={[styles.contenedorConductor, styles.sombras]}>

            <ScrollView>
                <View style={styles.campo}>
                    <Text style={styles.label}> Placa: </Text>
                    <TextInput
                      style={styles.input}
                      placeholder='Ingrese la placa'
                      value={placa}
                      onChangeText={ text => setPlaca(text)}
                    >
                    </TextInput>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}> Marca: </Text>
                    <TextInput
                      style={styles.input}
                      placeholder='Ingrese la marca'
                      value={marca}
                      onChangeText={text => setMarca(text)}
                    >
                    </TextInput>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}> Modelo: </Text>
                    <TextInput
                      style={styles.input}
                      placeholder='Ingrese el modelo'
                      value={modelo}
                      onChangeText={text => setModelo(text)}
                    >
                    </TextInput>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}> Color: </Text>
                    <TextInput
                      style={styles.input}
                      placeholder='Ingrese el color'
                      value={color}
                      onChangeText={text => setColor(text)}
                    >
                    </TextInput>
                </View>

                <View style= {styles.campo}>
                  <Text style= {styles.label} >¿Cual es el tipo de vehiculo?</Text>

                  <RNPickerSelect
                    placeholder = {{
                      label: 'Cual es el tipo?',
                      value: null,
                      color: '#3b3b3b',}
                    }
                    style={pickerSelectStyles}
                    value ={tipoVehiculo}
                    onValueChange={ value => ( setTipoVehiculo(value)) }
                    items={[
                      {key: 4 , label: 'SUV' , value: 4},
                      {key: 3 , label: 'Pick Up' , value: 1},
                      {key: 2 , label: 'Sedan' , value: 2},
                    ]} 
                    />
            </View>

          </ScrollView>
          </View>

          <View style={styles.botones}>
            <View>
              <Button
                title='Registrar Vehiculo'
                onPress={ handleSubmit }
              />
            </View>
          </View>

        </View>
    )
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
    contenedorConductor: {
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
      }
  });

export default Conductor;