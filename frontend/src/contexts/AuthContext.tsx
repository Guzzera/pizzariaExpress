import Router from 'next/router';
import { toast } from 'react-toastify';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/apiClient';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password:string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}


export function signOut(){ //Desloga o usuário
   try{
      destroyCookie(undefined, '@auth.token')
      Router.push('/')
   }catch(error) {
    
   }
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() => {
       const {'@auth.token': token} = parseCookies(); //Pega as informações do usuário logado no cookie
       if(token){
          api.get('/me').then(response => {
             const {id, name, email} = response.data;

              setUser({
                 id,
                 name,
                 email
              })
          })
          .catch(() => { //Se a requisição acima falhar, chama o signOut
             signOut();
          })
       }
    }, [])

    async function signIn({email, password}: SignInProps){
       try {
          const response = await api.post('/session', {
            email,
            password
          })

          const { id, name, token } = response.data;

          setCookie(undefined, '@auth.token', response.data.token, {
            maxAge: 60 * 60 * 24 * 30, //Expira em um mês
            path: '/' //Todos caminhos terão acesso ao cookie
          })

          setUser({
            id,
            name,
            email
          })

          api.defaults.headers['Authorization'] = `Bearer ${token}` //Envia o token para as próximas requisições

          toast.success('Logado com sucesso!')

          Router.push('/dashboard') //Envia para a página de pedidos

       }catch(err){
          toast.error('Erro ao acessar!')
           console.log('erro ao acessar', err)
       }
    }

    async function signUp({name, email, password}: SignUpProps){
       try{
          const response = await api.post('/users', {
             name,
             email,
             password
          })

          toast.success('Cadastrado com sucesso!')

          Router.push('/') //Redireciona pra Dashboard

       }catch(err){
          toast.error('Erro ao cadastrar!')
          console.log('erro ao cadastrar', err)
       }
    }
    return(
       <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
        {children}
       </AuthContext.Provider>
    )
}