import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const OrdersCalendar = ({ orders }) => {
  // Transform orders data into events format expected by react-big-calendar
  const events = orders.map((order) => ({
    id: order.orderId,
    title: order.customerName,
    start: new Date(order.orderDate),
    end: moment(order.orderDate).add(1, "days").toDate(), // Assuming each order is a single-day event
  }));

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

const CalendarComponent = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/orders.json");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-2"></div>
        <div className="col-span-9">
          <h1 className="text-xl font-semibold mb-5">
            Orders Calendar (Assuming each order is a single-day event ){" "}
          </h1>
          <div className="border-none sm:border p-3 rounded-md mb-5">
            <OrdersCalendar orders={orders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
