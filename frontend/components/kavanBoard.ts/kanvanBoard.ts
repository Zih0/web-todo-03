import kanvanBoardStyle from './kanvanBoard.scss';
import Component from '../core/component';
import IconClose from '../../assets/icons/close.svg';
import IconPlus from '../../assets/icons/plus.svg';

class KanvanBoard extends Component {
  constructor() {
    super();
  }

  setStyle() {
    this.styles.textContent = kanvanBoardStyle;
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
            <todo-card></todo-card>
        </div>
      </div>`;
  }
}

export default KanvanBoard;
