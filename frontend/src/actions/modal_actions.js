
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const removeModal = () => ({
  type: CLOSE_MODAL
});

const receiveModal = (modal) => ({
  type: OPEN_MODAL,
  modal
})

export const closeModal = dispatch => (
  dispatch(removeModal())
);

export const openModal = modal => dispatch => (
  dispatch(receiveModal(modal))
);