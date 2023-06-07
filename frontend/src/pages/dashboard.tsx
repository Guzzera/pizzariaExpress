import { useState } from "react"
import Head from "next/head"
import { SSRAuth } from "../utilities/SSRAuth"
import { Header } from "../components/Header"
import styles from '../../styles/home.module.scss'
import { FiRefreshCcw } from "react-icons/fi"
import { APIClient } from "../services/api"
import Modal from "react-modal"
import { ModalOrder } from "../components/ModalOrder"

type OrderProps = {
   id: string;
   table: string | number;
   status: boolean;
   draft: boolean;
   name: string | null;
}

export type OrderItemProps = {
   id: string;
   amount: number;
   order_id: string;
   product_id: string;
   product: {
      id: string;
      name: string;
      description: string;
      price: string;
      banner: string;
   }
   order: {
      id: string;
      table: string | number;
      status: boolean;
      name: string | null;
   }
}

interface HomeProps{
   orders: OrderProps[];
}

export default function Dashboard({orders}: HomeProps){
   const [orderList, setOrderList] = useState(orders || []);
   const [modalItem, setModalItem] = useState<OrderItemProps[]>()
   const [modalVisible, setModalVisible] = useState(false)

   function handleCloseModal(){
      setModalVisible(false);
   }

   async function handleOpenModal(id: string){
      const apiClient = APIClient();
      const response = await apiClient.get('/order/detail', {
         params: {
            order_id: id,
         }
      })

      setModalItem(response.data);
      setModalVisible(true);
   }

   async function handleFinishItem(id: string){
      const apiClient = APIClient();
      await apiClient.put('/order/finish', {
         order_id: id,
      })

      const response = await apiClient.get('/orders');
      setOrderList(response.data);
      setModalVisible(false);
   }

   async function handleRefreshOrders(){
      const apiClient = APIClient();
      const response = await apiClient.get('/orders');
      setOrderList(response.data);
   }

   Modal.setAppElement('#__next')

   return(
      <>
       <Head>
        <title>Painel - Pizza Express</title>
       </Head>
       <div>
        <Header/>
        <main className={styles.dashboardContainer}>
         <div>
          <h1>Últimos pedidos</h1>
          <button onClick={handleRefreshOrders}>
           <FiRefreshCcw size={20} color='#C20114'/>
          </button>
         </div>
         <article>
          {orderList.length === 0 && (
           <span className={styles.msg}>
            Nenhum pedido aberto
           </span>
          )}
          {orderList.map(item => (
           <section key={item.id}>
            <button onClick={() => handleOpenModal(item.id)}>
             <div>
              <span>Mesa {item.table}</span>
             </div>
            </button>
           </section>
          ))}
         </article>
        </main>
        { modalVisible && (
         <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
         />
        )}
       </div>
      </>
   )
}

export const getServerSideProps = SSRAuth(async (context) => {
   const apiClient = APIClient(context);
   const response = await apiClient.get('/orders');

   //console.log(response.data);

   return{
      props: {
         orders: response.data
      }
   }
})