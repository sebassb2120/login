import { useState, useEffect } from "react";
import { TextInput, Avatar, Button } from "react-native-paper";
import { View, Text} from "react-native";
import {styles} from '../assets/styles/stylest'

//importacion firebase
import {firebaseconfig} from '../firebaseconfig';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { initializeApp} from 'firebase/app';

export default function LoginScreen({navigation}){
    
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [showPass , setShowPass] = useState('');
    const [message , setMessage] = useState('');
    const [messageColor, setMessageColor] = useState(false);

    
   // configurar firebase
   const app = initializeApp(firebaseconfig);
   const auth = getAuth(app)

   // Métodos para crear cuenta e iniciar sesión
   const handleCreateAccount = () =>{
     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential)=>{
       console.log(userCredential.user.providerData);
       setMessage("Cuenta creada correctamente ...");
       setMessageColor(true)
     })
     .catch((error) => {
       console.log(error.message)
       setMessage("Correo y/o password incorrecto (s)...");
       setMessageColor(false)
     })
   }
 
   const handleSignIn = () =>{
     signInWithEmailAndPassword(auth, email, password)
     .then((userCredential)=>{
       navigation.navigate("Home",{email:email})
       setMessageColor(true)
     })
     .catch((error)=>{
       setMessage("Correo y/o contraseña INVÁLIDOS...");
       setMessageColor(false);
     })
   }
    
    return(
        
        <View style={styles.container}>
            <Avatar.Image 
                style={{marginTop:20}}
                size={100}
                source={require('../assets/icon.png')}
            />
            <View styles={{borderColor:'gray', borderWidth:2, padding:50}}>
                <TextInput
                    label="Correo Electronico"
                    onChangeText={email => setEmail(email)}
                    value={email}
                    left={<TextInput.Icon icon="email"/>}
                />
                <TextInput
                    style={{marginTop:10}}
                    label="Contraseña"
                    onChangeText={password => setPassword(password)}
                    value={password}
                    secureTextEntry={!showPass}
                    rigth={<TextInput.Icon icon={showPass ? "eye" : "eye-off"} onPress={() => setShowPass(!showPass)}/>}
                />
                <Button
                    icon="login"
                    style={{marginTop:10, backgroundColor:"orange"}}
                    mode='outlined' 
                    onPress={handleSignIn}
                >
                    Iniciar Sesión
                </Button>

                <Button
                    icon="account"
                    style={{marginTop:5, backgroundColor:"orange"}}
                    mode='outlined'
                    onPress={handleCreateAccount}
                >
                    Crear Cuenta
                </Button>
                <Text style={{color:messageColor ? "green" : "red", marginTop:10}}>{message}</Text>
            </View>
        </View>
    );
}