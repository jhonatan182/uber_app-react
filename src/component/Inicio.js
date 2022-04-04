import { useState , useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert,StatusBar,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import usePickerUbicaciones from '../hooks/usePickerUbicaciones';


const Inicio = ({navigation}) => {

    const precioPorKilometro = 30;
    const distancia = Math.floor((Math.random() * (100 - 1 + 1)) + 1);
    const total = distancia * precioPorKilometro 

    const [detalles , setDetalles] = useState('');
    const [ubicaciones, setUbicaciones] = useState([]);
    const [conductores , setConductores] = useState([]);
    const [pasajero ,setPasajero] = useState({});
    
    /* usando nuestro hook */
    const [ ubicacionInicio , SelectUbicacionesInicio ] = usePickerUbicaciones('Elige tu punto de partida' , ubicaciones);
    const [ ubicacionFinal , SelectUbicacionesFinal  ] = usePickerUbicaciones('Elige tu destino' , ubicaciones);
    const [ conductorId , SelectConductores ] = usePickerUbicaciones('Elige tu conductor' , conductores);
    
    useEffect(() => {

        console.log(pasajero.id)

        const obtenerUsuarioStorage = async () => {

            let usuario =  await AsyncStorage.getItem('usuarioAutenticado');
            usuario = await JSON.parse(usuario);

            const {usuario : { id , nombre}} = usuario

            setPasajero({id , nombre});

            
        }


        const consultarUbicacionesAPI = async() => {

            try {
                
                const url = 'http://192.168.1.248:4000/uber/api/ubicaciones/';

                const respuesta = await fetch(url);
                const resultado = await respuesta.json();


                const arrayUbicaciones = resultado.data.map( ubicacion => {

                    const objeto = {
                        label: ubicacion.nombre , 
                        value: ubicacion.nombre , 
                        key: ubicacion.id
                    }

                    return objeto;

                });

                setUbicaciones(arrayUbicaciones);

            } catch (error) {
                console.log(error);
            }


        }


        const consultarConductoresAPI = async () => {

            try {
                const urlConductores = 'http://192.168.1.248:4000/uber/api/usuario/conductores';
                const respuestaConductores = await fetch(urlConductores);
                const resultadoConductores = await respuestaConductores.json();


                if(resultadoConductores.data.length) {

                    const arrayConductores = resultadoConductores.data.map( conductor => {
          
                      const objeto = {
                          label: conductor.nombre , 
                          value: conductor.id , 
                          key: conductor.id
                      }
          
                      return objeto;
          
                    });
          
                    setConductores(arrayConductores);
                  }

            } catch (error) {
                console.log(error);
            }

        }
        obtenerUsuarioStorage();
        consultarConductoresAPI();
        consultarUbicacionesAPI();

    }, [])

    const pedirUber = async () => {
  
        if([ubicacionInicio , ubicacionFinal, conductorId].includes('')) {
          Alert.alert('Error' ,'Datos incorrectos');
          return;
          
        } 

        if(ubicacionFinal ===  ubicacionInicio) {
            Alert.alert('Ubicaciones' , 'No puede elegir dos ubicaciones iguales al mismo tiempo');
            return;
        }
                
        try {
            const url = 'http://192.168.1.248:4000/uber/api/usuario/viajes/guardarViajes/';

            const respuesta = await fetch(url , {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                }, 
                body : JSON.stringify({
                    pasajeroId : pasajero.id,
                    conductorId: conductorId,
                    direccionInicial: ubicacionInicio,
                    destinoFinal : ubicacionFinal,
                    distancia:distancia,
                    total:total
                }) 
            });

            await respuesta.json();

            Alert.alert('Detalles del Viaje' , `Tu punto de salida: ${ubicacionInicio} \n Tu destino: ${ubicacionFinal}\n Tu total: HNL.${total} \n
            Tu UBER llegara pronto!
            `
            );


        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <View style = {styles.container}>
                  <StatusBar
                    animated={true}
                    backgroundColor="#000"
                     />
                <View style = {styles.contenedorInicio}>
                    <View style = {styles.barraTitulo}>
                        <Text style ={styles.textoBlanco}>UBER</Text>
                        <Text style={styles.textoBlanco} 
                              onPress={() => navigation.navigate('Perfil')}>Mi Perfil</Text>
                    </View>
                    <View style = {styles.cuerpoInicio}>
                        <View style = {styles.encabezado}>
                            <Text style = {styles.textoBlanco}>Bienvenido {pasajero.nombre}, elije tu destino.</Text>
                            <Text style = {styles.textoBlanco}>¿ A donde te llevamos ?</Text>
                        </View>
                        <View style = {styles.contenedorPequenio}>
                            <View style = {styles.contenedorInputs}>
                                <View style = {styles.cuerpoInput}>
                                    <Text style = {styles.label}>Inicio</Text>
                                    <SelectUbicacionesInicio/>
                                </View>
                                <View style = {styles.cuerpoInput}>
                                    <Text style = {styles.label}>Final</Text>
                                    <SelectUbicacionesFinal/>
                                    
                                </View>
                                <View style = {styles.cuerpoInput}>
                                    <Text style = {styles.label}>Conductor</Text>
                                    <SelectConductores />
                                </View>
                                <View style = {styles.cuerpoDetalles}>
                                    <Text style = {styles.label}>Detalles del viaje</Text>
                                    <TextInput
                                        onChangeText={ text => setDetalles(text) }
                                        value={detalles}
                                        style = {styles.inputMulti}
                                        multiline ={true}
                                    >
                                    </TextInput>
                                </View>
                                <Button
                                    style = {styles.boton}
                                    title="Pedir Uber"
                                    color={'#000'}
                                    onPress={ pedirUber }
                                />
                            </View>
                        </View>
                        <View style = {styles.footer}>
                            <Text style ={styles.textoBlanco}>Gracias por usar UBER</Text>
                        </View>
                    </View>
                </View>
        </View>
     );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    contenedorInicio:{
        height:'100%',
        width:'100%',
        backgroundColor:'rgba(255, 255, 255, 0.80)',
    },
    encabezado:{
        backgroundColor:'#000',
        width:'100%',
        height:'15%',
        textAlign:'center',
        justifyContent:'center',
        borderBottomLeftRadius:70,
        borderBottomRightRadius:70,  
    },  
    barraTitulo:{
        backgroundColor:'#000',
        paddingBottom:'2%',
        paddingTop:10,
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    cuerpoInicio:{

        flex:1,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000",
        backgroundColor:'#F0F0F0',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        
        
    },
    contenedorPequenio:{
        height:'82%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',

    },
    input:{
        width:250,
        padding:10,
        borderBottomColor:'#000',
        borderBottomWidth:1
    },
    cuerpoInput:{
        flexDirection:'column',
        justifyContent:'space-between',
        width: 300,
    },  
    contenedorInputs:{
        flexDirection:'column',
        justifyContent:'center',
        padding:30,
        marginBottom:20,
        borderRadius:15,
    },
    label:{
        padding:10
    },
    cuerpoDetalles:{
        flexDirection:'column',
    },  
    inputMulti:{
        borderColor:'#000',
        borderWidth:1,
        width:'100%',
        height:100,
        padding:10,
        marginBottom:10
    },
    textoBlanco:{
        color:'#fff',
        textAlign:'center'
    },
    footer:{
        padding:10,
        backgroundColor:'#000',
        width:'100%',
        textAlign:'center',
    },
    icono:{
        width:40,
        height:40,
        resizeMode:'stretch'
    }
})
 
export default Inicio;