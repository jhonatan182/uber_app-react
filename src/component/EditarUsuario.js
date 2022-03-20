import { StyleSheet, Text, View, Button, Alert, StatusBar, Image,TouchableOpacity,ScrollView } from 'react-native';
import icono from '../../assets/userIcono.png'
import lapiz from '../../assets/pencil.png'
import bandera from '../../assets/hn.png'
import google from '../../assets/google.png'
import facebook from '../../assets/facebook.png'
const EditarUsuario = () => {

    return(
        <ScrollView style={styles.scrollView}>
            <View style = {styles.container}>
                <StatusBar
                animated={true}
                backgroundColor="#000"
                    />
                    <View style = {styles.header}>
                        <Text style = {styles.titulo}>Editar Cuenta</Text>
                    </View>
                    <View style = {styles.contenedorPerfil}>
                        <View style = {styles.fotoPerfil}>
                            <Image 
                                    source={icono}
                                    style={styles.icono}
                                />
                                <TouchableOpacity
                                style={styles.botonEditarFoto}
                                >
                                <Image 
                                    source={lapiz}
                                    style={styles.iconoLapiz}
                                />
                                </TouchableOpacity>
                                <View style = {styles.separador}></View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Nombre</Text>
                                <Text style = {styles.dato}>Suany</Text>
                            </View>
                            <View>
                                <Button
                                    title="Editar"
                                    color={'#000'}
                                    onPress={() => Alert.alert('Simple Button pressed')}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Apellido</Text>
                                <Text style = {styles.dato}>Garcia</Text>
                            </View>
                            <View>
                                <Button
                                    title="Editar"
                                    color={'#000'}
                                    onPress={() => Alert.alert('Simple Button pressed')}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Numero de telefono</Text>
                                <View style ={styles.imagenDato}>
                                    <Image 
                                        source={bandera}
                                        style = {styles.imagen}
                                    />
                                    <Text style = {styles.dato}>+504 9336-9363</Text>
                                </View>
                            </View>
                            <View>
                                <Button
                                    title="Editar"
                                    color={'#000'}
                                    onPress={() => Alert.alert('Simple Button pressed')}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Correo Electronico</Text>
                                <Text style = {styles.dato}>suanygarcia174@gmail.com</Text>
                            </View>
                            <View>
                                <Button
                                    title="Editar"
                                    color={'#000'}
                                    onPress={() => Alert.alert('Simple Button pressed')}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Contraseña</Text>
                                <Text style = {styles.dato}>**********</Text>
                            </View>
                            <View>
                                <Button
                                    title="Editar"
                                    color={'#000'}
                                    onPress={() => Alert.alert('Simple Button pressed')}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Conectar con:</Text>
                                <View style ={styles.imagenDato}>
                                    <Image 
                                        source={google}
                                        style = {styles.imagen}
                                    />
                                    <Text style = {styles.dato}>Google</Text>
                                </View>
                            </View>
                            <View>
                                <Button
                                    title="Conectar"
                                    color={'#000'}
                                    onPress={() => Alert.alert('Simple Button pressed')}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorDato}>
                            <View>
                                <Text style = {styles.label}>Conectar con:</Text>
                                <View style ={styles.imagenDato}>
                                    <Image 
                                        source={facebook}
                                        style = {styles.imagen}
                                    />
                                    <Text style = {styles.dato}>Facebook</Text>
                                </View>
                            </View>
                            <View>
                                <Button
                                    title="Conectar"
                                    color={'#000'}
                                    onPress={() => Alert.alert('Simple Button pressed')}
                                />
                            </View>
                        </View>
                    </View>
            </View>
                <View style = {styles.footer}>
                    <Text style ={{color:'#fff', textAlign:'center'}}>Gracias por usar UBER</Text>
                </View>
        </ScrollView>
    )
    

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    titulo:{
        backgroundColor:'#000',
        color:'#fff',
        fontSize:25,
        fontWeight:"100",
        padding:15
    },
    contenedorPerfil:{
        padding:20
    },
    icono:{
        width:90,
        height:90,
        resizeMode:'stretch'
    },
    botonEditarFoto:{
        marginTop:-25
    },
    iconoLapiz:{
        width:33,
        height:33,
        resizeMode:'stretch',
    },
    separador:{
        borderBottomColor: '#A7A8AF',
        borderBottomWidth: 1,
        paddingVertical:15
    },
    label:{
        fontSize:16,
        color:'#A7A8AF',

    },
    imagen:{
        width:40,
        height:35,
        resizeMode:'stretch',
        marginRight:10
    },
    contenedorDato:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:15
    },
    imagenDato:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    dato:{
        marginVertical:'3%',
        fontSize:16,
        color:'#000'
    },
    footer:{
        padding:10,
        backgroundColor:'#000',
        width:'100%',
    }
})



export default EditarUsuario;