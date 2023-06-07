import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {Feather} from '@expo/vector-icons'
import { api } from '../services/api';
import { ModalPicker } from '../components/ModalPicker';
import { ListItem } from '../components/ListItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../routes/app.routes';

type RouteDetailParams = {
 Order:{
  number: string,
  order_id: string
 }
}

export type CategoryProps = {
   id: string;
   name: string;
}

type ProductProps = {
   id: string;
   name: string;
}

type ItemProps = {
   id: string;
   product_id: string;
   name: string;
   amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order(){
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelect, setCategorySelect] = useState<CategoryProps>();
    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [productSelect, setProductSelect] = useState<ProductProps | undefined>();
    const [modalProduct, setModalProduct] = useState(false);
    const [amount, setAmount] = useState('1');
    const [items, setItems] = useState<ItemProps[]>([]);
    const [modalCategory, setModalCategory] = useState(false);

    useEffect(() => {
       async function loadInfo(){
          const response = await api.get('/category')
          setCategory(response.data)
          setCategorySelect(response.data[0])
       }

       loadInfo();
    }, []);

    useEffect(() => {
       async function loadProducts(){
         const response = await api.get('/category/product', {
            params:{
              category_id: categorySelect?.id
            }
         })

         //console.log(response.data)
         setProducts(response.data);
         setProductSelect(response.data[0])
       }

       loadProducts();

    }, [categorySelect])

    async function handleCloseOrder(){
       try{
        await api.delete('/order', {
           params:{
             order_id: route.params?.order_id
           }
        })
        navigation.goBack()
       }catch(err){
        console.log(err)
       }
    }

    function handleChangeCategory(item: CategoryProps){
       setCategorySelect(item);
    }

    function handleChangeProduct(item: ProductProps){
       setProductSelect(item);
    }

    async function handleAdd(){
       const response = await api.post('/order/add', {
         order_id: route.params?.order_id,
         product_id: productSelect?.id,
         amount: Number(amount)
       })

       let data = {
         id: response.data.id,
         product_id: productSelect?.id as string,
         name: productSelect?.name as string,
         amount: amount
       }

       setItems(oldArray => [...oldArray, data])
    }

    async function handleDeleteItem(item_id: string){
       await api.delete('/order/remove', {
         params:{
          item_id: item_id
         }
       })

       let removeItem = items.filter(item => {
         return(item.id !== item_id)
       })//remove apenas o item excluído

       setItems(removeItem)
    }

    function handleFinishOrder(){
      navigation.navigate('FinishOrder', {
        number: route.params?.number,
        order_id: route.params?.order_id
      })
    }

    return(
     <View style={styles.container}>
      <View style={styles.header}>
       <Text style={styles.title}>Mesa {route.params.number}</Text>
       {items.length === 0 && (
        <TouchableOpacity>
         <Feather name='trash-2' size={28} color='#009246' onPress={handleCloseOrder}/>
        </TouchableOpacity>
       )}
      </View>
      {category.length !== 0 && (
       <TouchableOpacity style={styles.input} onPress={() => setModalCategory(true)}>
        <Text style={{color: '#E9E4DA', fontWeight: '600'}}>
         {categorySelect?.name}
        </Text>
       </TouchableOpacity>
      )}
      {products.length !== 0 &&(
       <TouchableOpacity style={styles.input} onPress={() => setModalProduct(true)}>
        <Text style={{color: '#E9E4DA', fontWeight: '600'}}>
         {productSelect?.name}
        </Text>
       </TouchableOpacity>
      )}
      <View style={styles.qtdContainer}>
       <Text style={styles.qtdText}>Quantidade</Text>
       <TextInput
         style={[styles.input, {width: '40%', textAlign: 'center'}]}
         value={amount}
         onChangeText={setAmount}
         placeholderTextColor='#FCDEBE'
         keyboardType='numeric'
       />
      </View>
      <View style={styles.actions}>
       <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
        <Text style={styles.buttonText}>+</Text>
       </TouchableOpacity>
       <TouchableOpacity
          style={[styles.button, {opacity: items.length === 0 ? 0.5 : 1}]}
          disabled={items.length === 0}
          onPress={handleFinishOrder}
        >
        <Text style={styles.buttonText}>Avançar</Text>
       </TouchableOpacity>
      </View>
      <FlatList
         showsVerticalScrollIndicator={false}
         style={{flex: 1, marginTop: 24}}
         data={items}
         keyExtractor={(item) => item.id}
         renderItem={ ({item}) =><ListItem data={item} deleteItem={handleDeleteItem}/>}
      />
      <Modal
         transparent={true}
         visible={modalCategory}
         animationType='fade'
      >
       <ModalPicker
         handleCloseModal={() => setModalCategory(false)}
         options={category}
         selectedItem={handleChangeCategory}
       />
      </Modal>
      <Modal
        transparent={true}
        visible={modalProduct}
        animationType='fade'
      >
       <ModalPicker
         handleCloseModal={() => setModalProduct(false)}
         options={products}
         selectedItem={handleChangeProduct}
       />
      </Modal>
     </View>
    )
}

const styles = StyleSheet.create({
   container:{
     flex: 1,
     backgroundColor: '#FCDEBE',
     paddingVertical: '5%',
     paddingEnd: '4%',
     paddingStart: '4%'
   },

   header:{
     flexDirection: 'row',
     marginBottom: 12,
     alignItems: 'center',
     marginTop: 24
   },

   title:{
     fontSize: 30,
     fontWeight: 'bold',
     color: '#14110F',
     marginRight: 14
   },

   input:{
     backgroundColor: '#C20114',
     color: '#FCDEBE',
     borderRadius: 4,
     width: '100%',
     height: 40,
     marginBottom: 12,
     justifyContent: 'center',
     paddingHorizontal: 8,
     fontSize: 20,
     fontWeight: '600'
   },

   qtdContainer:{
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
   },

   qtdText:{
     paddingBottom: 15,
     fontSize: 20,
     fontWeight: 'bold',
     color: '#14110F'
   },

   actions:{
     flexDirection: 'row',
     width: '100%',
     justifyContent: 'space-between'
   },

   buttonAdd:{
     backgroundColor: '#C20114',
     borderRadius: 4,
     width: '20%',
     height: 40,
     justifyContent: 'center',
     alignItems: 'center'
   },

   buttonText:{
     color: '#FCDEBE',
     fontSize: 18,
     fontWeight: 'bold'
   },

   button:{
     backgroundColor: '#14110F',
     borderRadius: 4,
     height: 40,
     width: '75%',
     alignItems: 'center',
     justifyContent: 'center'
   }
})