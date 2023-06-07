import { FormEvent, useContext, useState } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Image from 'next/image';
import styles from '../../styles/home.module.scss'
import logoImg from '../../public/logo.png';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { AuthContext } from '../contexts/AuthContext';
import { SSRGuest } from '../utilities/SSRGuest';

export default function Home(){
  const {signIn} = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
     event.preventDefault();

     if(email === '' || password === ''){
        toast.warning('Preencha todos os campos')
        return;
     }

     setLoading(true)

     let data = {
      email,
      password
     }

     await signIn(data)

     setLoading(false)
  }

  return(
    <>
     <Head>
      <title>PizzaExpress - Faça seu login</title>
     </Head>
     <div className={styles.containerCentro}>
      <Image className={styles.logo} src={logoImg} alt='Logo Pizza Express'/>
      <div className={styles.login}>
       <form onSubmit={handleLogin}>
        <Input
          placeholder='Digite seu email'
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='Digite sua senha'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type='submit'
          loading={loading}
        >
          Acessar
        </Button>
       </form>
       <Link className={styles.text} href='/signup'>
        Não possui uma conta? Cadastre-se
       </Link>
      </div>
     </div>
    </>
  )
}

export const getServerSideProps = SSRGuest(async (context) => {
  return{
    props: {}
  }
})