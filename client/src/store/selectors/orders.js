const getOrderItem = (id, orders) => (orders.find(order => order.id === id));

export default { getOrderItem };

