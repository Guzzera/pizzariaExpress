import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { StackParamList } from '../routes/app.routes';
import { api } from '../services/api';

export default function Dashboard(){
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [table, setTable] = useState('');

  async function openOrder(){
    if(table === ''){
      return;
    }

    const response = await api.post('/order', {
      table: Number(table)
    })

    //console.log(response.data)
    navigation.navigate('Order', {number: table, order_id: response.data.id})//requisição para abrir a mesa e navegar pra próxima tela

    setTable('');
  }
    return(
     <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        style={styles.input}
        placeholder='Número da mesa'
        placeholderTextColor='#E9E4DA'
        keyboardType='numeric'
        value={table}
        onChangeText={(setTable)}
      />
      <TouchableOpacity style={styles.button} onPress={openOrder}>
       <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
     </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      backgroundColor: '#FCDEBE'
    },

    title:{
      fontSize: 30,
      fontWeight: 'bold',
      color: '#14110F',
      marginBottom: 24
    },

    input:{
      width: '90%',
      height: 60,
      backgroundColor: '#009246',
      borderRadius: 4,
      paddingHorizontal: 8,
      textAlign: 'center',
      fontSize: 22,
      color: '#E9E4DA'
    },

    button:{
      width: '90%',
      height: 40,
      backgroundColor: '#C20114',
      borderRadius: 4,
      marginVertical: 12,
      justifyContent: 'center',
      alignItems: 'center'
    },

    buttonText:{
      fontSize: 18,
      color: '#E9E4DA',
      fontWeight: 'bold'
    }
})