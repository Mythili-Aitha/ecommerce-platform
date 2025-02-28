import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../Components/Api";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderDetails(orderId)
      .then((response) => setOrder(response.data))
      .catch((error) => console.error("Error fetching order details:", error));
  }, [orderId]);

  if (!order) return <p>Loading order details...</p>;

  return (
    <div>
      <h2>Order #{order.orderId}</h2>
      <p>Status: {order.status}</p>
      <p>Total Price: ${order.totalPrice}</p>
      <h3>Items:</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.productName} - {item.quantity} pcs - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
