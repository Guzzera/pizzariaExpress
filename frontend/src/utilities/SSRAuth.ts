import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';

export function SSRAuth<P>(fn: GetServerSideProps<P>) {
   return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
      const cookies = parseCookies(context);
      const token = cookies['@auth.token'];

      if(!token){//Somente usuários logados tem permissão para acessar as páginas
         return{
            redirect:{
               destination: '/',
               permanent: false
            }
         }
      }

      try{
         return await fn(context);
      }catch(err){
         if(err instanceof AuthTokenError){
            destroyCookie(context, '@auth.token');

            return{
               redirect:{
                  destination: '/',
                  permanent: false
               }
            }
         }
      }
   }
}