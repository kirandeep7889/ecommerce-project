import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../Redux/ordersSlice';
import styles from './OrderPage.module.css'; 

const OrderPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders.orders);

    useEffect(() => {
        dispatch(fetchUserOrders());
    },[dispatch]);

    const userName = orders.length > 0 ? orders[0].user.name : '';

    return (
        <div className={styles['order-container']}> 
            {orders.length > 0 && (
                <div className={styles['user-details']}> 
                    <h1 className={styles['user-name']} style={{ background: 'linear-gradient(to right, #ff5e62, #ff9966)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hello, {userName}</h1>
                    <h2 className={styles['order-heading']}>Orders Summary:</h2>
                </div>
            )}
            <div className={styles['order-list']}>
                {orders.map(order => (
                    <div key={order._id} className={styles['order']}> 
                        {order.products.map(product => (
                            <div key={product._id} className={styles['product']}>
                                <div>
                                   <img className={styles['product-image']} src={product.image} alt={product.title} />
                               </div>
                                <div className={styles['product-details']}> 
                                    <h4 className={styles['product-title']}>{product.title}</h4>
                                    <p className={styles['product-price']}>Price: ${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderPage;
