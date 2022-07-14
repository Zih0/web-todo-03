import kanvanBoardStyle from './kanvanBoard.css';
import Component from '../core/component.js';
import IconClose from '../../assets/icons/close.svg';
import IconPlus from '../../assets/icons/plus.svg';
import { TODO_STATUS } from '../../pages/mainPage/index.js';

const KANVANBOARD_TITLE = {
  [TODO_STATUS.TODO]: 'TODO',
  [TODO_STATUS.PROGRESS]: 'IN PROGRESS',
  [TODO_STATUS.DONE]: 'DONE',
};

class KanvanBoard extends Component {
  constructor() {
    super();
  }

  setStyle() {
    this.styles.textContent = kanvanBoardStyle;
  }

  setTemplate() {
    const title = this.getAttribute('title');
    const dataList = this.getAttribute('data-list') ? JSON.parse(this.getAttribute('data-list')) : [];

    return `<div class="kanvan">
        <div class="kanvan__header">
          <div class="kanvan__header__left">
            <p class="kanvan__title">${KANVANBOARD_TITLE[title]}</p>
            <p class="kanvan__count">${dataList.length}</p>
          </div>
          <div class="kanvan__header__right">
            <img src=${IconPlus} alt="추가" />
            <img src=${IconClose} alt="삭제" />
          </div>
        </div>
        <div class="kanvan__card__list">
            ${dataList
              .map(
                (data) =>
                  `<todo-card title="${data.title}" description="${data.description}" card-id="${data.todo_id}"></todo-card>`,
              )
              .join('')}
        </div>
      </div>`;
  }

  static get observedAttributes() {
    return ['data-list', 'title'];
  }
}

export default KanvanBoard;
