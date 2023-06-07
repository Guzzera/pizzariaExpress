import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { AuthContext } from '../contexts/AuthContext';

function Routes(){
    const {isAuth, loading} = useContext(AuthContext)

    if(loading){
     return(
      <View style={{
        flex: 1,
        backgroundColor: '#14110F',
        justifyContent: 'center',
        alignItems: 'center',
       }}
      >
       <ActivityIndicator size={60} color='#FCDEBE'/>
      </View>
     )
    }

 return(
  isAuth ? <AppRoutes/> : <AuthRoutes/>
 )
}

export default Routes;