import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CategoryProps } from '../pages/Order'

interface ModalPickerProps{
 options: CategoryProps[],
 handleCloseModal: () => void;
 selectedItem: (item: CategoryProps) => void;
}

const {width: largura, height: altura} = Dimensions.get('window')

export function ModalPicker({options, handleCloseModal, selectedItem}: ModalPickerProps){

    function onPressItem(item: CategoryProps){
       //console.log(item)
       selectedItem(item);
       handleCloseModal();
    }

    const option = options.map((item, index) => (
       <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => onPressItem(item)}
        >
        <Text style={styles.item}>
         {item?.name}
        </Text>
       </TouchableOpacity>
    ))

   return(
    <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
     <View style={styles.content}>
      <ScrollView showsVerticalScrollIndicator={false}>
       {option}
      </ScrollView>
     </View>
    </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
   },

   content:{
    width: largura - 20,
    height: altura / 2,
    backgroundColor: '#E9E4DA',
    borderWidth: 1,
    borderColor: '#14110F',
    borderRadius: 4
   },

   option:{
    alignItems: 'flex-start',
    borderTopWidth: 0.8,
    borderTopColor: '#C20114'
   },

   item:{
    margin: 18,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#14110F'
   }
})