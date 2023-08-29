import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import FeedCard from "../../../../components/feed-card/feed-card";
import styles from "./profile-orders.module.css";
import { useAppSelector, useAppDispatch } from "../../../../utils/hooks";
import {
  wsConnectionStart,
  wsConectionClose,
} from "../../../../store/websocket-slice/websocket-slice";
import { WSS_FOR_USER_ORDERS } from "../../../../utils/constants";
import { allUserOrders } from "../../../../store/selectors/selectors";

const ProfileOrders = () => {
  const data = useAppSelector(allUserOrders);

  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "История заказов";
    const token = localStorage.getItem("accesToken")?.replace("Bearer ", "");
    dispatch(wsConnectionStart(`${WSS_FOR_USER_ORDERS}${token}`));
    return () => {
      dispatch(wsConectionClose());
    };
  }, [dispatch]);

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
