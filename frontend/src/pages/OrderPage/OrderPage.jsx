import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../Redux/ordersSlice';
import styles from './OrderPage.module.css'; 
import { ToastContainer, toast } from 'react-toastify';

const OrderPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders.orders);
    const loading = useSelector(store => store.orders.loading);
    const error = useSelector(store => store.orders.error);

    useEffect(() => {
        dispatch(fetchUserOrders())
            .then(() => {
                toast.success("Orders fetched successfully")
            })
            .catch((error) => {
                toast.error('Failed to fetch orders. Please try again.');
            });
    }, [dispatch]);

    const userName = orders.length > 0 ? orders[0].user.name : '';

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default OrderPage;
