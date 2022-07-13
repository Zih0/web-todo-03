export const openAlertModal = () => {
  const alertModal = document
    .querySelector('#main__page')
    .shadowRoot.querySelector('#alert__modal')
    .shadowRoot.querySelector('.modal');

  alertModal.classList.add('open');
};

export const closeAlertModal = () => {
  const alertModal = document
    .querySelector('#main__page')
    .shadowRoot.querySelector('#alert__modal')
    .shadowRoot.querySelector('.modal');

  alertModal.classList.remove('open');
};
