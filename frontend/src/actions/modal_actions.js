
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const receiveModalStatus = (status) => ({
  type: status
});

export const closeModal = dispatch => (
  dispatch(receiveModalStatus(CLOSE_MODAL))
);

export const openModal = dispatch => (
  dispatch(receiveModalStatus(OPEN_MODAL))
);