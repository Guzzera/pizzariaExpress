import Link from 'next/link';
import { FiLogOut} from 'react-icons/fi';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function Header(){
   const {signOut} = useContext(AuthContext)

   return(
      <header className={styles.headerContainer}>
       <div className={styles.headerContent}>
        <Link href={'/dashboard'}>
         <img src='/logo.png' width={100} height={60}/>
        </Link>
        <nav>
         <Link href='/category'>
          Categoria
         </Link>
         <Link href='/product'>
          Cardápio
         </Link>
         <button onClick={signOut}>
          <FiLogOut color='#14110f' size={24}/>
         </button>
        </nav>
       </div>
      </header>
   )
}