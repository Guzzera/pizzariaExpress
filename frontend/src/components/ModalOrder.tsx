import Modal from "react-modal"
import styles from "./styles.module.scss"
import { FiX } from "react-icons/fi"
import { OrderItemProps } from "../pages/dashboard"


interface ModalOrderProps{
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps[];
    handleFinishOrder: (id: string) => void;
}

export function ModalOrder({isOpen, onRequestClose, order, handleFinishOrder}: ModalOrderProps){
    const customStyle = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#14110F'
        }
    }
    return(
        <div>
         <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyle}
         >
          <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
            style={{background: 'transparent', border: 0}}
          >
           <FiX size={40} color="#FCDEBE"/>
          </button>
          <div className={styles.modalContainer}>
           <h2>Detalhes do pedido</h2>
           <span className={styles.modalTable}>
            Mesa: <strong>{order[0].order.table}</strong>
           </span>
           {order.map(item => (
            <section key={item.id} className={styles.modalItem}>
             <span>
              {item.amount} - <strong>{item.product.name}</strong>
             </span>
             <span className={styles.modalDescription}>{item.product.description}</span>
            </section>
           ))}
           <button className={styles.orderButton} onClick={() => handleFinishOrder(order[0].order_id)}>
            Concluir pedido
           </button>
          </div>
         </Modal>
        </div>
    )
}