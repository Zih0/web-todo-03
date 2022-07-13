import Component from '../core/component.js';
import alertModalStyle from './alertModal.css';

class AlertModal extends Component {
  constructor() {
    super();

    this.setEvent();
  }

  open() {
    this.shadowRoot.querySelector('.modal').classList.add('open');
  }

  close() {
    this.shadowRoot.querySelector('.modal').classList.remove('open');
  }

  setStyle() {
    this.styles.textContent = alertModalStyle;
  }

  handleClickCancelButton() {
    this.close();
  }

  handleClickDeleteButton() {
    const cardId = this.getAttribute('card-id');
    const card = [...document.querySelector('main-page').shadowRoot.querySelectorAll('todo-kanvan')].map(
      (kanvanBoard) => kanvanBoard.shadowRoot.querySelectorAll(`todo-card[card-id=${cardId}]`),
    );
    // card.remove();
    console.log(card);
    // TODO : Delete API 호출
    this.close();
  }

  setEvent() {
    this.addEvent('click', '#modal__cancel-btn', this.handleClickCancelButton.bind(this));
    this.addEvent('click', '#modal__delete-btn', this.handleClickDeleteButton.bind(this));
  }

  setTemplate() {
    return `
    <div class="modal">
      <div class="modal__background"></div>
      <div class="modal__content">
        <h5 class="modal__title">선택한 카드를 삭제할까요?</h5>
        <div class="modal__button__wrapper">
          <custom-button id="modal__cancel-btn" text="취소"></custom-button>
          <custom-button id="modal__delete-btn" type="primary" text="삭제"></custom-button>
        </div>
      </div>
    </div>`;
  }
}

export default AlertModal;
