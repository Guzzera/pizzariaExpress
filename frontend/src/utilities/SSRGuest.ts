import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

//Função para usuários visitantes
export function SSRGuest<P>(fn: GetServerSideProps<P>) {
   return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
      const cookies = parseCookies(context);

      if(cookies['@auth.token']){//Se usuário tem o login salvo no cookie é redirecionado pra Dashboard
         return{
            redirect:{
               destination: '/dashboard',
               permanent: false
            }
         }
      }

      return await fn(context);
   }
}