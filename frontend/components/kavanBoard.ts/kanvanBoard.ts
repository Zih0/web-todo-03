import './kanvanBoard.scss';
import Component from '../core/component';
import Card from '../card/card';
import IconClose from '../../assets/icons/close.svg';
import IconPlus from '../../assets/icons/plus.svg';

export default class KanvanBoard extends Component {
  constructor() {
    super();
  }

  setTemplate() {
    return `<div class="kanvan">
    <div class="kanvan__header">
      <div class="kanvan__header__left">
        <p class="kanvan__title">TODO</p>
        <p class="kanvan__count">2</p>
      </div>
      <div class="kanvan__header__right">
        <img src=${IconPlus} alt="추가" />
        <img src=${IconClose} alt="삭제" />
      </div>
    </div>
    <div class="kanvan__card__list">
        <div id="kanvan__card"></div>
    </div>
  </div>`;
  }

  setComponents() {
    return { kanvan__card: new Card() };
  }
}

customElements.define('todo-kanvan', KanvanBoard);
