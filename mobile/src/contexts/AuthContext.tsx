import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextData = {
   user: UserProps;
   isAuth: boolean;
   signIn: (credentials: SignInProps) => Promise<void>
   loadAuth: boolean;
   loading: boolean;
   signOut: () => Promise<void>
}

type UserProps = {
   id: string;
   name: string;
   email: string;
   token: string;
}

type AuthProviderProps = {
   children: ReactNode;
}

type SignInProps = {
   email: string;
   password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({
       id: '',
       name: '',
       email: '',
       token: ''
    })

    const [loadAuth, setLoadAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const isAuth = !!user.name;

    useEffect(() =>{
       async function getUser(){
          //Pega os dados salvos do user
          const userInfo = await AsyncStorage.getItem('@auth.mobile');
          let hasUser: UserProps = JSON.parse(userInfo || '{}');

          //verifica se recebemos as informações
          if(Object.keys(hasUser).length > 0){
             api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

             setUser({
                id: hasUser.id,
                name: hasUser.name,
                email: hasUser.email,
                token: hasUser.token
             })
          }

          setLoading(false);
       }

       getUser();
       
    },[])

    async function signIn({email, password}: SignInProps){
       setLoadAuth(true)

       try{
         const response = await api.post('/session', {
            email,
            password
         })
         
         const {id, name, token} = response.data
         const data = {...response.data}


         await AsyncStorage.setItem('@auth.mobile', JSON.stringify(data))

         api.defaults.headers.common['Authorization'] = `Bearer ${token}`

         setUser({
            id,
            name,
            email,
            token
         })

         setLoadAuth(false);

       }catch(err){
         console.log('erro ao acessar', err)
         setLoadAuth(false)
       }
    }

    async function signOut(){
      await AsyncStorage.clear().then(() => {
         setUser({
            id: '',
            name: '',
            email: '',
            token: ''
         })
      })
    }

   return(
    <AuthContext.Provider value={{user, isAuth, signIn, loadAuth, loading, signOut}}>
     {children}
    </AuthContext.Provider>
   )
}