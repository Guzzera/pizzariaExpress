import React, { useContext, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function SignIn(){
  const {signIn, loadAuth} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(){
     if(email === '' || password ===''){
      return;
     }

     await signIn({email, password})
  }

   return(
    <View style={styles.container}>
     <Image
       style={styles.logo}
       source={require('../assets/logo.png')}
     />
     <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder='Digite seu e-mail'
        placeholderTextColor='#FCDEBE'
        keyboardType='email-address'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='Digite sua senha'
        secureTextEntry={true}
        placeholderTextColor='#FCDEBE'
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loadAuth ? (
          <ActivityIndicator size={25} color='#E9E4DA'/>
        ) : (
       <Text style={styles.buttonText}>Acessar</Text>
       )}
      </TouchableOpacity>
     </View>
    </View>
   )
}

const styles = StyleSheet.create({
    container:{
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#FCDEBE'
    },

    logo:{
     width: 200,
     height: 120,
     marginBottom: 18,
    },

    inputContainer:{
     width: '95%',
     alignItems: 'center',
     justifyContent: 'center',
     paddingVertical: 32,
     paddingHorizontal: 14
    },

    input:{
     width: '95%',
     height: 40,
     backgroundColor: '#009246',
     marginBottom: 12,
     borderRadius: 4,
     paddingHorizontal: 8,
     color: '#E9E4D4'
    },

    button:{
     width: '95%',
     height: 40,
     backgroundColor: '#C20114',
     borderRadius: 4,
     justifyContent: 'center',
     alignItems: 'center'
    },

    buttonText:{
     fontSize: 18,
     fontWeight: 'bold',
     color: '#E9E4DA'
    }
})