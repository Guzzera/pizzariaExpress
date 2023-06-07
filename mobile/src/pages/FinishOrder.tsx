import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../routes/app.routes';

type RouteDetailParams = {
  FinishOrder: {
    number: number | string;
    order_id: string;
  }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export function FinishOrder(){
  const route = useRoute<FinishOrderRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  async function handleFinish(){
    try{
      await api.put('/order/send', {
        order_id: route.params?.order_id
      })

      navigation.popToTop();

    }catch(err){
      alert('ERRO AO FINALIZAR')
    }
  }

 return(
  <View style={styles.container}>
   <Text style={styles.alert}>Deseja finalizar o pedido?</Text>
   <Text style={styles.title}>Mesa {route.params?.number}</Text>
   <TouchableOpacity style={styles.button} onPress={handleFinish}>
    <Text style={styles.textButton}>Finalizar pedido</Text>
    <Feather name='shopping-cart' size={20} color='#E9E4DA'/>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FCDEBE',
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  alert:{
    fontSize: 20,
    color: '#14110F',
    fontWeight: 'bold',
    marginBottom: 12
  },

  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#14110F',
    marginBottom: 12
  },

  button:{
    backgroundColor: '#C20114',
    flexDirection: 'row',
    width: '65%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },

  textButton:{
    fontSize: 18,
    marginRight: 8,
    fontWeight: 'bold',
    color: '#FCDEBE'
  }
})