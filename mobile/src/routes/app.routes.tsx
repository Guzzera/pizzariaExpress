import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';
import { FinishOrder } from '../pages/FinishOrder';

export type StackParamList = {
 Dashboard: undefined;
 Order:{
  number: number | string;
  order_id: string;
 };
 FinishOrder: undefined;
}

const Stack = createNativeStackNavigator<StackParamList>();

function AppRoutes(){
    return(
       <Stack.Navigator>
        <Stack.Screen
          name='Dashboard'
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Order'
          component={Order}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='FinishOrder'
          component={FinishOrder}
          options={{headerShown: true}}
        />
       </Stack.Navigator>
    )
}

export default AppRoutes;