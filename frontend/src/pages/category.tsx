import Head from 'next/head';
import { Header } from '../components/Header';
import styles from '../../styles/home.module.scss';
import { FormEvent, useState } from 'react';
import { APIClient } from '../services/api';
import { toast } from 'react-toastify';
import { SSRAuth } from '../utilities/SSRAuth';

export default function Category(){
   const [name, setName] = useState('');

   async function handleRegister(event: FormEvent){
      event.preventDefault();
      
      if(name === ''){
         return;
      }

      const apiClient = APIClient();
      await apiClient.post('/category', {
         name: name
      })

      toast.success('Categoria cadastrada com sucesso!');
      setName('');
   }
   return(
      <>
       <Head>
        <title>Nova Categoria - Pizza Express</title>
       </Head>
       <div>
        <Header/>
        <main className={styles.categoryContainer}>
         <h1>Cadastrar categoria</h1>
         <form onSubmit={handleRegister}>
          <input
            type='text'
            placeholder='Digite o nome da categoria'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          <button type='submit'>
           Cadastrar
          </button>
         </form>
        </main>
       </div>
      </>
   )
}

export const getServerSideProps = SSRAuth(async (context) => {
   return{
      props: {}
   }
})