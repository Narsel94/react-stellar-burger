import React from "react";
import { InitialData } from "../../../../utils/constants";
import { useLocation, Link } from "react-router-dom";
import FeedCard from "../../../../components/feed-card/feed-card";
import styles from "./profile-orders.module.css"


const ProfileOrders = () => {
  const data = InitialData;
  const location = useLocation();

  return (
    <div className={styles.page}>
      {data &&
        data.orders.map((order) => (
          <Link
            to={`/profile/orders/${order._id}`}
            key={order._id}
            state={{ profileOrder: location, orderData: order.number }}
            className={styles.link}
          >
            <FeedCard key={order._id} order={order} />
          </Link>
        ))}
    </div>
  );
};

export default ProfileOrders;
