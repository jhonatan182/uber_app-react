import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert,ImageBackground,Image } from 'react-native';
import icono from '../../assets/userIcon.png'
const Inicio = () => {
    const [inicio , setInicio] = useState('');
    const [final , setFinal] = useState('');
    const [conductor , setConductor] = useState('');
    const [detalles , setDetalles] = useState('');
    
    const pedirUber = () => {
  
        if([inicio , final, conductor, detalles].includes('')) {
          Alert.alert('Error' ,'Datos incorrectos');
          return;
          
        } 
          
        Alert.alert('Urra' ,'Datos completados');
        
        }

    return ( 
        <View style = {styles.container}>
                <View style = {styles.contenedorInicio}>
                    <View style = {styles.barraTitulo}>
                        <Text style ={styles.textoBlanco}>UBER</Text>
                        <Image 
                            source={icono}
                            style={styles.icono}
                        />
                    </View>
                    <View style = {styles.cuerpoInicio}>
                        <View style = {styles.encabezado}>
                            <Text style = {styles.textoBlanco}>Bienvenido Usuario, elije tu destino.</Text>
                            <Text style = {styles.textoBlanco}>¿ A donde te llevamos ?</Text>
                        </View>
                        <View style = {styles.contenedorPequenio}>
                            <View style = {styles.contenedorInputs}>
                                <View style = {styles.cuerpoInput}>
                                    <Text style = {styles.label}>Inicio</Text>
                                    <TextInput
                                        onChangeText={ text => setInicio(text) }
                                        value={inicio}
                                        style = {styles.input}
                                    >
                                    </TextInput>
                                </View>
                                <View style = {styles.cuerpoInput}>
                                    <Text style = {styles.label}>Final</Text>
                                    <TextInput
                                        onChangeText={ text => setFinal(text) }
                                        value={final}
                                        style = {styles.input}
                                    >
                                    </TextInput>
                                </View>
                                <View style = {styles.cuerpoInput}>
                                    <Text style = {styles.label}>Conductor</Text>
                                    <TextInput
                                        onChangeText={ text => setConductor(text) }
                                        value={conductor}
                                        style = {styles.input}
                                    >
                                    </TextInput>
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
                                    onPress={() => Alert.alert('Simple Button pressed')}
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
        justifyContent: 'center'
    },
    contenedorInicio:{
        backgroundColor:'none',
        height:'600px',
        width:'450px',
        borderRadius:"10px",
        backgroundColor:'rgba(255, 255, 255, 0.80)'
    },
    encabezado:{
        backgroundColor:'#000',
        width:'100%',
        height:'70px',
        textAlign:'center',
        justifyContent:'center',
        borderBottomLeftRadius:'40px',
        borderBottomRightRadius:'40px',
        
    },  
    barraTitulo:{
        backgroundColor:'#000',
        borderTopLeftRadius:'10px',
        borderTopRightRadius:'10px',
        paddingBottom:'40px',
        paddingTop:'10px',
        paddingHorizontal:'10px',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
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
        borderBottomLeftRadius:'10px',
        borderBottomRightRadius:'10px'
    },
    contenedorPequenio:{
        height:'460px',
        width:'400px',
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width:'250px',
        padding:'10px',
        borderBottomColor:'#000',
        borderBottomWidth:'1px'
    },
    cuerpoInput:{
        flexDirection:'column',
        justifyContent:'space-between',
    },  
    contenedorInputs:{
        flexDirection:'column',
        justifyContent:'center',
        padding:'30px',
        marginBottom:'20px',
        borderRadius:'15px'
    },
    label:{
        padding:'10px'
    },
    cuerpoDetalles:{
        flexDirection:'column',
    },  
    inputMulti:{
        borderColor:'#000',
        borderWidth:'1px',
        width:'100%',
        height:'100px',
        padding:'10px',
        marginBottom:'10px'
    },
    textoBlanco:{
        color:'#fff'
    },
    footer:{
        padding:'10px',
        backgroundColor:'#000',
        width:'100%',
        textAlign:'center',
        borderBottomLeftRadius:'10px',
        borderBottomRightRadius:'10px'
    },
    imgBackground:{
        flex:'1'
    },
    icono:{
        width:'40px',
        height:'40px',
        resizeMode:'stretch'
    }
})
 
export default Inicio;