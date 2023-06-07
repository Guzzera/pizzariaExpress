import { FormEvent, useContext, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import styles from '../../styles/home.module.scss'
import logoImg from '../../public/logo.png';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { AuthContext } from '../contexts/AuthContext';

export default function SignUp(){
  const {signUp} = useContext(AuthContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent){
     event.preventDefault();

     if(name === '' || email === '' || password === ''){
        toast.warning('Preencha todos os campos')
        return;
     }

     setLoading(true);

     let data = {
        name,
        email,
        password
     }

     await signUp(data)

     setLoading(false)
  }
  return(
    <>
     <Head>
      <title>PizzaExpress - Faça seu cadastro</title>
     </Head>
     <div className={styles.containerCentro}>
      <Image className={styles.logo} src={logoImg} alt='Logo Pizza Express'/>
      <div className={styles.login}>
        <h1>Criando sua conta</h1>
       <form onSubmit={handleSignUp}>
        <Input
          placeholder='Digite seu nome'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          onChange={(e) => setPassowrd(e.target.value)}
        />
        <Button
          type='submit'
          loading={loading}
        >
          Acessar
        </Button>
       </form>
       <Link className={styles.text} href='/'>
        Já possui uma conta? Faça seu login
       </Link>
      </div>
     </div>
    </>
  )
}