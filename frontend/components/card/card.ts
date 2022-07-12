import Component from '../core/component';
import cardStyle from './card.scss';
import IconClose from '../../assets/icons/close.svg';

class Card extends Component {
  constructor() {
    super();
  }

  setStyle() {
    this.styles.textContent = cardStyle;
  }

  setTemplate() {
    this.template.innerHTML = `<div class="card">
    <div class="card__header">
      <p class="card__title">GitHub 공부하기</p>
      <img src=${IconClose} alt="삭제" />
    </div>
    <p class="card__desc">add, commit, push</p>
    <button class="card__tag">Git</button>
  </div>`;
  }
}

export default Card;
