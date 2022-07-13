export const openAlertModal = () => {
  const alertModal = document.querySelector('alert-modal').shadowRoot.querySelector('.modal');

  alertModal.classList.add('open');
};

export const closeAlertModal = () => {
  const alertModal = document.querySelector('alert-modal').shadowRoot.querySelector('.modal');

  alertModal.classList.remove('open');
};
