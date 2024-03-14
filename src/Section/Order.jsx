import React, { useState, useEffect } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState([]);

  const getOrders = async () => {
    try {
      const response = await fetch("/orders.json");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProductsForOrder = async () => {
    try {
      const responseOrders = await fetch("/products.json");
      const ordersData = await responseOrders.json();
      setProduct(ordersData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    getProductsForOrder();
  }, [orders]);

  // console.log(orders);
  // console.log(product);

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-2"></div>
        <div className="col-span-9">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="flex flex-col bg-white p-4 rounded-md shadow-md mb-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">
                  <span className="text-black/50">Customer Name</span>:{" "}
                  {order.customerName}
                </h2>
                <span className="text-gray-600">
                  Order Date: {order.orderDate}
                </span>
              </div>
              <div className="mb-2">
                <strong>Order ID:</strong>{" "}
                <span className="text-red-500">{order.orderId}</span>
              </div>
              {order.status && (
                <span
                  style={{
                    backgroundColor:
                      order.status === "Processing"
                        ? "blue"
                        : order.status === "Shipped"
                        ? "orange"
                        : order.status === "Delivered"
                        ? "green"
                        : "transparent",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    color: "white", // You can adjust the text color based on your needs
                  }}
                >
                  {order.status}
                </span>
              )}
              <div>
                <table className="w-full">
                  <thead>
                    <tr className="flex flex-row justify-between items-center">
                      <th>Product Ordered By Customer</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="w-full flex flex-col gap-4">
                    {product.map((item) => {
                      const matchingOrderItem = order.items.find(
                        (orderItem) => orderItem.productId === item.id
                      );
                      //console.log(matchingOrderItem);
                      if (matchingOrderItem) {
                        return (
                          <tr
                            key={item.id}
                            className="flex flex-row justify-between items-center border rounded-xl"
                          >
                            <td className="flex flex-row justify-start items-center gap-10">
                              <img src={item.image} className="w-20 h-20" />
                              <div className="flex flex-col justify-start items-start gap-2">
                                <h2>Product Name: {item.name}</h2>
                                <h2>Price: ${item.price}</h2>
                                <h2>
                                  Quantity Available: {item.stockQuantity}
                                </h2>
                              </div>
                            </td>
                            <td className="mr-5">
                              {matchingOrderItem.quantity}
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
