import kanvanBoardStyle from './kanvanBoard.css';
import Component from '../core/component.js';
import IconClose from '../../assets/icons/close.svg';
import IconPlus from '../../assets/icons/plus.svg';

const DUMMY = [
  {
    id: 1,
    title: 'test1',
    description: 'abc',
  },
  {
    id: 2,
    title: 'test2',
    description: 'abc',
  },
  {
    id: 3,
    title: 'test3',
    description: 'abc',
  },
  {
    id: 4,
    title: 'test4',
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
              (data) =>
                `<todo-card title="${data.title}" description="${data.description}" card-id="${data.id}"></todo-card>`,
            ).join('')}
        </div>
      </div>`;
  }
}

export default KanvanBoard;
