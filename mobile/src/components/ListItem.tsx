import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import {Feather} from '@expo/vector-icons'

interface ItemProps{
 data:{
   id: string;
   product_id: string;
   name: string;
   amount: string | number;
 };

 deleteItem:(item_id: string) => void;
}

export function ListItem({data, deleteItem}: ItemProps){

    function handleDeleteItem(){
       deleteItem(data.id)
    }

   return(
    <View style={styles.container}>
     <Text style={styles.item}>{data.amount} - {data.name}</Text>
     <TouchableOpacity onPress={handleDeleteItem}>
      <Feather name='trash-2' size={25} color='#FCDEBE'/>
     </TouchableOpacity>
    </View>
   )
}

const styles = StyleSheet.create({
   container:{
     flex: 1,
     backgroundColor: '#009246',
     alignItems: 'center',
     justifyContent: 'space-between',
     flexDirection: 'row',
     marginBottom: 12,
     paddingVertical: 12,
     paddingHorizontal: 12,
     borderRadius: 4,
     borderWidth: 0.5,
     borderColor: '#14110F'
   },

   item:{
     color: '#E9E4DA',
     fontSize: 18
   },
})