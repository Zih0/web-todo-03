import Component from '../core/component.js';
import cardStyle from './card.css';
import IconClose from '../../assets/icons/close.svg';

const CARD_TYPE = {
  NORMAL: 'NORMAL',
  MODIFY: 'MODIFY',
};

class Card extends Component {
  constructor() {
    super();

    this.cardType = CARD_TYPE.NORMAL;

    this.reRender();
    this.setEvent();
  }

  setStyle() {
    this.styles.textContent = cardStyle;
  }

  toggleCardType() {
    if (this.cardType === CARD_TYPE.MODIFY) {
      this.cardType = CARD_TYPE.NORMAL;
    } else {
      this.cardType = CARD_TYPE.MODIFY;
    }
  }

  handleDlbClickCard(e) {
    if (this.cardType === CARD_TYPE.MODIFY) return;

    this.toggleCardType();
    this.reRender();
  }

  handleClickCloseButton(e) {
    e.stopPropagation();

    const alertModalComponent = document.querySelector('#main__page').shadowRoot.querySelector('#alert__modal');
    alertModalComponent.setAttribute('card-id', this.getAttribute('card-id'));
    const alertModal = alertModalComponent.shadowRoot.querySelector('.modal');

    alertModal.classList.add('open');
  }

  handleClickCancelButton(e) {
    this.toggleCardType();

    this.reRender();
  }

  handleClickSubmitButton(e) {
    e.stopPropagation();
    const inputTitle = this.shadowRoot.querySelector('input.card__title');

    if (!inputTitle.value) return;

    this.cardType = CARD_TYPE.NORMAL;
    const descriptionTextArea = this.shadowRoot.querySelector('textarea.card__desc');
    this.setAttribute('description', descriptionTextArea.value);
  }

  handleInputTitle(e) {
    const { value: inputValue } = e.target;
    const submitButton = this.shadowRoot.querySelector('#card__submit-btn').shadowRoot.querySelector('.custom-button');

    if (inputValue) {
      submitButton.classList.remove('disabled');
    } else {
      submitButton.classList.add('disabled');
    }
  }

  handleKeydownTextArea(e) {
    const descriptionTextArea = e.target;

    descriptionTextArea.style.height = 'auto';
    descriptionTextArea.style.height = `${descriptionTextArea.scrollHeight}px`;
  }

  setEvent() {
    this.addEvent('dblclick', '.card', this.handleDlbClickCard.bind(this));
    this.addEvent('click', '.card__close-btn', this.handleClickCloseButton.bind(this));
    this.addEvent('click', '#card__cancel-btn', this.handleClickCancelButton.bind(this));
    this.addEvent('click', '#card__submit-btn', this.handleClickSubmitButton.bind(this));
    this.addEvent('keydown', 'textarea.card__desc', this.handleKeydownTextArea.bind(this));
    this.addEvent('input', 'input.card__title', this.handleInputTitle.bind(this));
  }

  setTemplate() {
    if (this.cardType === CARD_TYPE.NORMAL) return this.getNormalCardTemplate();

    if (this.cardType === CARD_TYPE.MODIFY) return this.getModifyCardTemplate();
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
        <input class="card__title" placeholder="제목을 입력하세요." value=${this.getAttribute('title')} />
      </div>
      <textarea class="card__desc" placeholder="내용을 입력해주세요.">${this.getAttribute('description')}</textarea>
      <div class="card__button__wrapper">
        <custom-button id="card__cancel-btn" text="취소"></custom-button>
        <custom-button id="card__submit-btn" type="primary" text="등록"></custom-button>
      </div>
    </div>`;
  }

  static get observedAttributes() {
    return ['title', 'description'];
  }
}

export default Card;
