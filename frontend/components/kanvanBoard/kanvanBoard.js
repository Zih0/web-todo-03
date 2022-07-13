import kanvanBoardStyle from './kanvanBoard.css';
import Component from '../core/component.js';
import IconClose from '../../assets/icons/close.svg';
import IconPlus from '../../assets/icons/plus.svg';

const DUMMY = [
  {
    title: 'test',
    description: 'abc',
  },
  {
    title: 'test',
    description: 'abc',
  },
  {
    title: 'test',
    description: 'abc',
  },
  {
    title: 'test',
    description: 'abc',
  },
];

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
            ${DUMMY.map(
              (data) => `<todo-card title="${data.title}" description="${data.description}"></todo-card>`,
            ).join('')}
        </div>
      </div>`;
  }
}

export default KanvanBoard;
