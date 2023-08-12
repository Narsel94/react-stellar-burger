import { useDispatch, useSelector } from "react-redux";
import Main from "../components/main/main";
import Modal from "../components/modal/modal";
import { useAppSelector } from "../utils/hooks";

import { closeModal } from "../store/modal-slice";
import OrderDetails from "../components/order-details/order-details";

export default function Home() {
  const { isOrderModalOpen } = useAppSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Main />
      {isOrderModalOpen && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
