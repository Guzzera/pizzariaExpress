import { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/home.module.scss';
import { SSRAuth } from '../utilities/SSRAuth';
import { Header } from '../components/Header';
import { FiUpload } from 'react-icons/fi';
import { APIClient } from '../services/api';
import { toast } from 'react-toastify';

type ItemProps = {
   id: string;
   name: string;
}

interface CategoryProps{
   categoryList: ItemProps[];
}

export default function Product({categoryList}: CategoryProps){
    const [imgURL, setImgURL] = useState('');
    const [imgProduct, setImgProduct] = useState(null);
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    function handleFile(e: ChangeEvent<HTMLInputElement>){
       if(!e.target.files){
          return;
       }

       const image = e.target.files[0];

       if(!image){
          return;
       }

       if(image.type === 'image/jpeg' || image.type === 'image/png'){
          setImgProduct(image);
          setImgURL(URL.createObjectURL(e.target.files[0]));
       }
    }

    function handleChangeCategory(e){
       setCategorySelected(e.target.value)
    }

    async function handleRegister(e: FormEvent){
       e.preventDefault();

       try{
          const data = new FormData();
          if(name === '' || price === '' || description === '' || imgProduct === null){
             toast.error('Preencha todos os campos!')
             return;
          }

          data.append('name', name);
          data.append('price', price);
          data.append('description', description);
          data.append('category_id', categories[categorySelected].id);
          data.append('file', imgProduct);

          const apiClient = APIClient();
          await apiClient.post('/product', data);
          toast.success('Produto cadastrado com sucesso!')

       }catch(err){
          toast.error('Ops! Erro ao cadastrar')
       }

       setName('');
       setPrice('');
       setDescription('');
       setImgProduct(null);
       setImgURL('');
    }

    return(
        <>
         <Head>
          <title>Cardápio - Pizza Express</title>
         </Head>
         <div>
          <Header/>
          <main className={styles.productContainer}>
           <h1>Novo Produto</h1>
           <form onSubmit={handleRegister}>
            <label>
             <span>
             <FiUpload
                size={30}
                color='#FCDEBE'
             />
             </span>
             <input
                type='file'
                accept='image/png, image/jpeg'
                onChange={handleFile}
             />
             
             {imgURL && (
                <img
                   src={imgURL}
                   alt='Foto do produto'
                   width={250}
                   height={250}
                />
             )}

            </label>
            <select value={categorySelected} onChange={handleChangeCategory}>
             {categories.map( (item, index) => {
               return(
                  <option key={item.id} value={index}>
                   {item.name}
                  </option>
               )
             })}
            </select>
            <input
               type='text'
               placeholder='Nome do produto'
               value={name}
               onChange={ (e) => setName(e.target.value)}
            />
            <input
               type='text'
               placeholder='Preço do Produto'
               value={price}
               onChange={ (e) => setPrice(e.target.value)}
            />
            <textarea
               placeholder='Descrição do produto'
               value={description}
               onChange={ (e) => setDescription(e.target.value)}
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
   const apiClient = APIClient(context)
   const response = await apiClient('/category')
   // console.log(response.data)
    return{
        props: {
           categoryList: response.data
        }
    }
})