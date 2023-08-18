import React, { useEffect } from "react";
import { InitialData } from "../../../../utils/constants";
import { useLocation, Link } from "react-router-dom";
import FeedCard from "../../../../components/feed-card/feed-card";
import styles from "./profile-orders.module.css";
import { useAppSelector, useAppDispatch } from "../../../../utils/hooks";
import {
  wsConnectionStart,
  wsConectionClose,
} from "../../../../store/websocket-slice";
import { WSS_FOR_USER_ORDERS } from "../../../../utils/constants";

const ProfileOrders = () => {
  const data = useAppSelector((state) => state.websocket.orders);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accesToken")?.replace("Bearer ", "");

  useEffect(() => {
    dispatch(wsConnectionStart(`${WSS_FOR_USER_ORDERS}${token}`));

  }, []);

  return (
    <div className={styles.page}>
      {data &&
        data.map((order) => (
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
