import Component from '../core/component.js';
import alertModalStyle from './alertModal.css';

class AlertModal extends Component {
  constructor() {
    super();
  }

  open() {
    this.shadowRoot.querySelector('.modal').classList.add('open');
  }

  close() {
    this.shadowRoot.querySelector('.modal').classList.remove('open');
    this.removeAttribute('card-id');
  }

  setStyle() {
    this.styles.textContent = alertModalStyle;
  }

  handleClickCancelButton() {
    this.close();
  }

  handleClickDeleteButton(e) {
    e.stopPropagation();

    const cardId = this.getAttribute('card-id');

    const dataList = JSON.parse(document.querySelector('main-page').getAttribute('data-list'));
    const newDataList = dataList.filter((data) => data.todo_id !== Number(cardId));
    document.querySelector('main-page').setAttribute('data-list', JSON.stringify(newDataList));

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
