import React from "react";
import styles from "./feeds.module.css";
import { InitialData } from "../../utils/constants";
import FeedCard from "../../components/feed-card/feed-card";
const Feeds = () => {
  const data = InitialData;

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large mt-4 mb-4">Лента заказов</h1>
      <section className={styles.page}>
        <article className={styles.section}>
          {data &&
            data.orders.map((order) => (
              <FeedCard key={order._id} order={order} />
            ))}
        </article>
        <article className={styles.info}>
          <div className={styles.orders}>
            <div className={styles.ordersRedyInfo}>
              <h3 className="text text_type_main-medium">Готовы:</h3>
              <div className={styles.ordersList}>
                {data.orders.slice(-18).map((item) => {
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
};

export default Feeds;
