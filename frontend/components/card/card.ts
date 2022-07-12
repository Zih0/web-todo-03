import Component from '../core/component';
import './card.scss';
import IconClose from '../../assets/icons/close.svg';

export default class Card extends Component {
  constructor() {
    super();
  }

  setTemplate() {
    return ` <div class="card">
      <div class="card__header">
        <p class="card__title">GitHub 공부하기</p>
        <img src=${IconClose} alt="삭제" />
      </div>
      <p class="card__desc">add, commit, push</p>
      <button class="card__tag">Git</button>
    </div>`;
  }
}

customElements.define('todo-card', Card);
