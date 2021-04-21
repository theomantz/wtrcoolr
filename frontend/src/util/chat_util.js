import axois from 'axois';

export const getChat = () => {
  return axois.get('/chat/coolr/')
}