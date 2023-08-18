import React, {useEffect} from "react";
import styles from "./feeds.module.css";
import FeedCard from "../../components/feed-card/feed-card";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { wsConnectionStart, wsConectionClose } from "../../store/websocket-slice";
import { WSS_FOR_ORDERS } from "../../utils/constants";

const Feeds = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.websocket);
  const location = useLocation();

  const Test = useAppSelector((state) => state.websocket.orders)

  useEffect(() => {
    console.log(data)
  }, []);

   if (data.orders) {
    return (
    <main className={styles.main}>
      <h1 className={`${styles.title} text text_type_main-large mt-4 mb-4`}>Лента заказов</h1>
      <section className={styles.page}>
        <article className={styles.section}>
        {/* <FeedCard key={Test[4]._id} order={Test[4]} />
        <FeedCard key={Test[2]._id} order={Test[2]} /> */}

        {Test.map((order) => (
          <Link
                to={`/feeds/${order._id}`}
                key={order._id}
                state={{ orderback: location, orderData: order.number  }}
                className={styles.link}
              >
                <FeedCard key={order._id} order={order} />
              </Link>

        ))

        }
          {/* {
            Test.map((order) => (
              <Link
                to={`/feeds/${order._id}`}
                key={order._id}
                state={{ orderback: location, orderData: order.number  }}
                className={styles.link}
              >
                <FeedCard key={order._id} order={order} />
              </Link>
            ))} */}
        </article>
        <article className={styles.info}>
          <div className={styles.orders}>
            <div className={styles.ordersRedyInfo}>
              <h3 className="text text_type_main-medium">Готовы:</h3>
              <div className={styles.ordersList}>
                {data.orders.slice(0, 10).map((item) => {
                  if (item.status === "done") {
                    return (
                      <p
                        key={item._id}
                        className={`${styles.orderNumber} text text_type_digits-default`}
                      >
                        {item.number}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
            <div className={styles.ordersRedyInfo}>
              <h3 className="text text_type_main-medium">В работе:</h3>
              <div className={styles.ordersList}>
                {data.orders.map((item) => {
                  if (item.status === "created") {
                    return (
                      <p
                        key={item._id}
                        className={`${styles.orderNumberCreated} text text_type_digits-default`}
                      >
                        {item.number}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className={styles.totalInfo}>
            <div>
              <p className="text text_type_main-medium">
                Выполнено за все время:
              </p>
              <span className={`${styles.span} text text_type_digits-large`}>
                {data.total}
              </span>
            </div>
            <div>
              <p className="text text_type_main-medium">
                Выполнено за сегодня:
              </p>
              <span className={`${styles.span} text text_type_digits-large`}>
                {data.totalToday}
              </span>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
   }
  return null
};

export default Feeds;



// useEffect(() => {
//   dispatch(wsConnectionStart(`${WSS_FOR_ALL_ORDERS}`));
//   return () => {
//     dispatch(wsConnectionClosed());
//   };
// }, [dispatch]);