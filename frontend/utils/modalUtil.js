import { disableBodyScroll } from './styleUtil.js';

export const openAlertModal = () => {
  const alertModal = document.querySelector('alert-modal').shadowRoot.querySelector('.modal');

  alertModal.classList.add('open');
  disableBodyScroll();
};

export const closeAlertModal = () => {
  const alertModal = document.querySelector('alert-modal').shadowRoot.querySelector('.modal');

  alertModal.classList.remove('open');
  enableBodyScroll();
};
