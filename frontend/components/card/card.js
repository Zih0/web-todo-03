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
    this.addEvent();
  }

  setStyle() {
    this.styles.textContent = cardStyle;
  }

  handleDlbClickCard(e) {
    e.stopPropagation();
    e.preventDefault();

    if (this.cardType === CARD_TYPE.MODIFY) return;

    this.cardType = CARD_TYPE.MODIFY;
    this.reRender();
  }

  handleClickCloseButton(e) {
    e.stopPropagation();

    console.log('delete');
  }

  addEvent() {
    this.addEventListener('dblclick', this.handleDlbClickCard.bind(this));
  }

  setTemplate() {
    if (this.cardType === CARD_TYPE.NORMAL) return this.getNormalCardTemplate();

    if (this.cardType === CARD_TYPE.MODIFY) return this.getModifyCardTemplate();

    // return this.getNormalCardTemplate();
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
    </div>`;
  }

  getModifyCardTemplate() {
    return `
    <div class="card">
      <div class="card__header">
        <input class="card__title__input" placeholder="제목을 입력하세요." value=${this.getAttribute('title')} />
      </div>
      <textarea class="card__desc" placeholder="내용을 입력해주세요.">${this.getAttribute('description')}</textarea>
      <div class="card__button__wrapper">
        <custom-button text="취소"></custom-button>
        <custom-button type="primary" text="등록"></custom-button>
      </div>
    </div>`;
  }

  static get observedAttributes() {
    return ['title', 'description'];
  }
}

export default Card;
