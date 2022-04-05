import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditarEstado from "./EditarEstado";

const Pasajeros = ({ navigation }) => {
    const [pasajeros, setPasajeros] = useState([]);
    const [editarUsuario, setEditarUsuario] = useState({});
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        const consultarPasajerosAPI = async () => {
            try {
                const url =
                    "http://192.168.0.12:4000/uber/api/usuario/pasajeros";

                const respuesta = await fetch(url);
                const resultado = await respuesta.json();

                setPasajeros(resultado.data);
            } catch (error) {
                console.log(error);
            }
        };

        consultarPasajerosAPI();
    }, []);

    useEffect(() => {
        if (Object.keys(editarUsuario).length > 0) {
            setEditando(true);
        }

    }, [editarUsuario]);

    const handleActualizar = async () => {

        try {
            const url =
                "http://192.168.0.12:4000/uber/api/usuario/pasajeros";

            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            setPasajeros(resultado.data);
            Alert.alert('Actualizado', 'Registros actualizados');
        } catch (error) {
            console.log(error);
        }
    }

    const enviarPasajero = (usuario) => {
        setEditarUsuario(usuario);
    };

    return (
        <>
            { !editando  ? (
                <>
                    <View style={[styles.contenedorEncabezado, styles.sombra]}>
                        <Text style={styles.encabezado}>
                            Panel de Pasajeros
                        </Text>
                        
                    </View>

                    <Text
                        style={styles.actualizar}
                        onPress={ handleActualizar }
                    >
                    Actualizar
                    </Text>

                    <ScrollView>
                        {pasajeros.map((pasajero) => (
                            <View
                                key={pasajero.id}
                                style={[styles.contenedor, styles.sombra]}
                            >
                                <View style={styles.contenedorAcciones}>

                                    
                                    <View style={styles.campo}>
                                        <Text style={styles.titulo}>
                                            Nombre:
                                        </Text>
                                        <Text
                                            style={styles.info}
                                        >{`${pasajero.nombre} ${pasajero.apellido}`}</Text>
                                    </View>

                                    <View style={styles.campo}>
                                        <Text style={styles.titulo}>
                                            E-mail:
                                        </Text>
                                        <Text style={styles.info}>
                                            {pasajero.correo}
                                        </Text>
                                    </View>

                                    <View style={styles.campo}>
                                        <Text style={styles.titulo}>
                                            Teléfono:
                                        </Text>
                                        <Text style={styles.info}>
                                            {pasajero.telefono}
                                        </Text>
                                    </View>

                                    <View style={styles.campo}>
                                        <Text style={styles.titulo}>
                                            Estado:
                                        </Text>
                                        <Text style={styles.info}>
                                            {pasajero.estado}
                                        </Text>
                                    </View>

                                    <View style={styles.centrarDerecha}>
                                        <Text
                                            style={styles.botonEditar}
                                            onPress={() =>
                                                enviarPasajero(pasajero)
                                            }
                                        >
                                            Editar Usuario
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.footer}>
                        <Text
                            style={styles.boton}
                            onPress={() => navigation.navigate("Admin")}
                        >
                            Atras
                        </Text>
                    </View>
                </>

            ) : (
                <EditarEstado 
                    editarUsuario={editarUsuario}
                    setEditarUsuario={setEditarUsuario}
                    setEditando={setEditando}
                />
            )}
        </>
    );
};

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
        height: 400,
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
    centrarDerecha: {
        display: "flex",
        alignItems: "flex-end",
    },
    botonEditar: {
        backgroundColor: "#1d4ed8",
        color: "#fff",
        padding: 10,
        borderRadius: 5,
        fontWeight: "700",
    },
    actualizar: {
        paddingHorizontal: 28,
        paddingVertical: 13,
        backgroundColor: "#15803d",
        color: "#fff",
        fontSize: 16,
        borderRadius: 5,
        fontWeight: "700",
        textTransform: "uppercase",
        marginVertical: 6,
        textAlign: 'center',
        margin: 10,
    }
});

export default Pasajeros;
