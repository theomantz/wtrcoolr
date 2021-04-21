export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

export const dispatchMessage = message => {
  return {
    type: RECEIVE_MESSAGE,
    message
  }
}