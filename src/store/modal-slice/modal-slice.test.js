import modalReducer, {openOrderDetailsModal, closeModal} from './modal-slice'


describe('modalSlice', () => {
  it('should set true with "openOrderDetailsModal" action', () => {
    const action = {
      type: openOrderDetailsModal.type
    }
    const result = modalReducer(undefined, action)
    expect(result).toEqual({isOrderModalOpen: true})
  });

  it('should set false with "closeModal" action', () => {
    const action = {
      type: closeModal.type
    }
    const result = modalReducer(undefined, action)
    expect(result).toEqual({isOrderModalOpen: false})
  });
  //проверка в случае если стейт был инициализирован
  it('should toggle isOrderModalOpen to false with "closeModal" action', () => {
    const initialState = {isOrderModalOpen: true};
    const action = {
      type: closeModal.type
    }
    const result = modalReducer(initialState, action)
    expect(result).toEqual({isOrderModalOpen: false})
  })
})