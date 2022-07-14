import Component from '../core/component.js';
import cardStyle from './card.css';
import IconClose from '../../assets/icons/close.svg';
import { openAlertModal } from '../../utils/modalUtil.js';

export const CARD_TYPE = {
  NORMAL: 'NORMAL',
  MODIFY: 'MODIFY',
  CREATE: 'CREATE',
};

class Card extends Component {
  constructor() {
    super();

    if (this.getAttribute('card-type') === CARD_TYPE.CREATE) this.disableSubmitButton();
  }

  setStyle() {
    this.styles.textContent = cardStyle;
  }

  toggleCardType() {
    if (this.getAttribute('card-type') === CARD_TYPE.MODIFY) {
      this.setAttribute('card-type', CARD_TYPE.NORMAL);
    } else {
      this.setAttribute('card-type', CARD_TYPE.MODIFY);
    }
  }

  removeCard() {
    this.remove();
  }

  handleDoubleClickCard(e) {
    if (this.getAttribute('card-type') !== CARD_TYPE.NORMAL) return;

    this.toggleCardType();
  }

  enabledSubmitButton() {
    const submitButton = this.shadowRoot.querySelector('.card__submit-btn').shadowRoot.querySelector('.custom-button');

    submitButton.classList.remove('disabled');
  }

  disableSubmitButton() {
    const submitButton = this.shadowRoot.querySelector('.card__submit-btn').shadowRoot.querySelector('.custom-button');

    submitButton.classList.add('disabled');
  }

  handleClickCloseButton(e) {
    e.stopPropagation();

    const alertModal = document.querySelector('alert-modal');
    alertModal.setAttribute('card-id', this.getAttribute('card-id'));

    openAlertModal();
  }

  handleClickCancelButton(e) {
    if (this.getAttribute('card-type') === CARD_TYPE.MODIFY) this.toggleCardType();
    if (this.getAttribute('card-type') === CARD_TYPE.CREATE) this.removeCard();
  }

  handleClickSubmitButton(e) {
    e.stopPropagation();

    const inputTitle = this.shadowRoot.querySelector('input.card__title');
    if (!inputTitle.value) return;

    const descriptionTextArea = this.shadowRoot.querySelector('textarea.card__desc');
    this.setAttribute('title', inputTitle.value);
    this.setAttribute('description', descriptionTextArea.value);
    this.setAttribute('card-type', CARD_TYPE.NORMAL);
  }

  handleInputTitle(e) {
    const { value: inputValue } = e.target;

    if (inputValue) this.enabledSubmitButton();
    else this.disableSubmitButton();
  }

  handleInputTextArea(e) {
    const descriptionTextArea = e.target;

    descriptionTextArea.style.height = 'auto';
    descriptionTextArea.style.height = `${descriptionTextArea.scrollHeight}px`;
  }

  setEvent() {
    this.addEvent('dblclick', '.card', this.handleDoubleClickCard.bind(this));
    this.addEvent('click', '.card__close-btn', this.handleClickCloseButton.bind(this));
    this.addEvent('click', '.card__cancel-btn', this.handleClickCancelButton.bind(this));
    this.addEvent('click', '.card__submit-btn', this.handleClickSubmitButton.bind(this));
    this.addEvent('input', 'textarea.card__desc', this.handleInputTextArea.bind(this));
    this.addEvent('input', 'input.card__title', this.handleInputTitle.bind(this));
  }

  setTemplate() {
    if (this.getAttribute('card-type') === CARD_TYPE.NORMAL) return this.getNormalCardTemplate();
    if (this.getAttribute('card-type') === CARD_TYPE.MODIFY) return this.getModifyCardTemplate();
    if (this.getAttribute('card-type') === CARD_TYPE.CREATE) return this.getCreateCardTemplate();
  }

  getNormalCardTemplate() {
    return `
    <div class="card">
      <div class="card__header">
        <p class="card__title">${this.getAttribute('title')}</p>
        <button class="card__close-btn">
          <img src=${IconClose} alt="삭제" />
        </button>
      </div>
      <p class="card__desc">${this.getAttribute('description')}</p>
    </div>
    `;
  }

  getModifyCardTemplate() {
    return `
    <div class="card">
      <div class="card__header">
        <input class="card__title" placeholder="제목을 입력하세요." value=${this.getAttribute('title') || 'a'} />
      </div>
      <textarea class="card__desc" placeholder="내용을 입력해주세요.">${this.getAttribute('description')}</textarea>
      <div class="card__button__wrapper">
        <custom-button class="card__cancel-btn" text="취소"></custom-button>
        <custom-button class="card__submit-btn" type="primary" text="등록"></custom-button>
      </div>
    </div>`;
  }

  getCreateCardTemplate() {
    return `
    <div class="card" tabindex="0">
      <div class="card__header">
        <input class="card__title" placeholder="제목을 입력하세요." />
      </div>
      <textarea class="card__desc" placeholder="내용을 입력해주세요."></textarea>
      <div class="card__button__wrapper">
        <custom-button class="card__cancel-btn" text="취소"></custom-button>
        <custom-button class="card__submit-btn" type="primary" text="등록"></custom-button>
      </div>
    </div>`;
  }

  static get observedAttributes() {
    return ['title', 'description', 'card-type'];
  }
}

export default Card;
