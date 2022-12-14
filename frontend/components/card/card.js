import Component from '../core/component.js';
import cardStyle from './card.css';
import IconClose from '../../assets/icons/close.svg';
import { openAlertModal } from '../../utils/modalUtil.js';
import { createTodo, moveTodo, updateTodo } from '../../api/todo.js';
import { TODO_STATUS } from '../../pages/mainPage/index.js';

export const CARD_TYPE = {
  NORMAL: 'NORMAL',
  MODIFY: 'MODIFY',
  CREATE: 'CREATE',
};

const DRAG_DELAY_TIME = 250;

class Card extends Component {
  constructor() {
    super();

    this.kanvan__todo = document.querySelector('main-page').shadowRoot.querySelector('#main__kanvan__todo');
    this.kanvan__progress = document.querySelector('main-page').shadowRoot.querySelector('#main__kanvan__progress');
    this.kanvan__done = document.querySelector('main-page').shadowRoot.querySelector('#main__kanvan__done');

    if (this.getAttribute('card-type') === CARD_TYPE.CREATE) this.disableSubmitButton();
  }

  setDropzoneStyle(customElement) {
    const kanvan = customElement.shadowRoot.querySelector('.kanvan');

    kanvan.classList.add('dropzone');
  }

  removeDropzoneStyle(customElement) {
    const kanvan = customElement.shadowRoot.querySelector('.kanvan');

    kanvan.classList.remove('dropzone');
  }

  checkPosition(x, y) {
    const {
      left: todoLeft,
      right: todoRight,
      top: todoTop,
      bottom: todoBottom,
    } = this.kanvan__todo.getBoundingClientRect();
    const {
      left: progressLeft,
      right: progressRight,
      top: progressTop,
      bottom: progressBottom,
    } = this.kanvan__progress.getBoundingClientRect();
    const {
      left: doneLeft,
      right: doneRight,
      top: doneTop,
      bottom: doneBottom,
    } = this.kanvan__done.getBoundingClientRect();

    if (x >= todoLeft && x <= todoRight && y >= todoTop && y <= todoBottom) {
      this.setDropzoneStyle(this.kanvan__todo);
      this.setAttribute('drop-status', TODO_STATUS.TODO);
    } else {
      this.removeDropzoneStyle(this.kanvan__todo);
    }

    if (x >= progressLeft && x <= progressRight && y >= progressTop && y <= progressBottom) {
      this.setDropzoneStyle(this.kanvan__progress);
      this.setAttribute('drop-status', TODO_STATUS.PROGRESS);
    } else {
      this.removeDropzoneStyle(this.kanvan__progress);
    }

    if (x >= doneLeft && x <= doneRight && y >= doneTop && y <= doneBottom) {
      this.setDropzoneStyle(this.kanvan__done);
      this.setAttribute('drop-status', TODO_STATUS.DONE);
    } else {
      this.removeDropzoneStyle(this.kanvan__done);
    }
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

  setDragging(element) {
    element.setAttribute('dragging', '');
    element.shadowRoot.querySelector('.card').classList.add('place');
  }

  deleteDragging(element) {
    element.removeAttribute('dragging');
    element.shadowRoot.querySelector('.card').classList.remove('place');
  }

  handlePickUpCard(e) {
    if (this.getAttribute('card-type') !== CARD_TYPE.NORMAL) return;
    if (e.target.closest('.card__close-btn')) return;
    this.setAttribute('dragging', '');

    const initialX = e.pageX;
    const initialY = e.pageY;
    const { top: initialTop, left: initialLeft } = this.getBoundingClientRect();

    setTimeout(() => {
      if (!this.hasAttribute('dragging')) return;
      this.setDragging(this);

      const cloneCard = this.cloneNode(true);
      cloneCard.classList.add('clone');
      cloneCard.style.position = 'absolute';
      cloneCard.style.zIndex = 1000;
      cloneCard.style.left = e.x;
      cloneCard.style.top = e.y;

      cloneCard.shadowRoot.querySelector('.card').classList.add('dragging');

      document.querySelector('main-page').shadowRoot.append(cloneCard);

      const moveAt = (x, y) => {
        this.checkPosition(x, y);

        const offsetX = x - initialX;
        const offsetY = y - initialY;

        cloneCard.style.top = `${initialTop + offsetY}px`;
        cloneCard.style.left = `${initialLeft + offsetX}px`;
      };

      moveAt(e.pageX, e.pageY);

      const handleMoveCard = (e) => {
        moveAt(e.pageX, e.pageY);
      };

      cloneCard.addEventListener('pointermove', handleMoveCard);

      const handlePutCard = () => {
        cloneCard.removeEventListener('pointermove', handleMoveCard);

        this.deleteDragging(this);
        document.querySelector('main-page').shadowRoot.removeChild(cloneCard);
        this.moveCard();
      };
      cloneCard.addEventListener('pointerup', handlePutCard);
    }, DRAG_DELAY_TIME);
  }

  removeCard() {
    this.remove();
  }

  moveCard() {
    const cardId = this.getAttribute('card-id');
    const cardStatus = this.getAttribute('card-status');
    const dropStatus = this.getAttribute('drop-status');

    const kanvanBoard =
      dropStatus === TODO_STATUS.TODO
        ? this.kanvan__todo
        : dropStatus === TODO_STATUS.PROGRESS
        ? this.kanvan__progress
        : this.kanvan__done;

    if (cardStatus === dropStatus) {
      this.removeDropzoneStyle(kanvanBoard);
      return;
    }

    moveTodo(cardId, `${cardStatus},${dropStatus}`).then(() => {
      this.setAttribute('card-status', TODO_STATUS[dropStatus]);

      const dataList = JSON.parse(document.querySelector('main-page').getAttribute('data-list'));
      dataList.forEach((todoData) => {
        if (todoData.todo_id === Number(cardId)) {
          todoData.status = dropStatus;
        }
      });
      document.querySelector('main-page').setAttribute('data-list', JSON.stringify(dataList));
    });
    this.removeDropzoneStyle(kanvanBoard);
  }

  handleDoubleClickCard(e) {
    if (this.getAttribute('card-type') !== CARD_TYPE.NORMAL) return;

    this.removeAttribute('dragging');

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
    alertModal.setAttribute('card-status', this.getAttribute('card-status'));

    openAlertModal();
  }

  handleClickCancelButton(e) {
    e.stopPropagation();

    if (this.getAttribute('card-type') === CARD_TYPE.MODIFY) this.toggleCardType();
    if (this.getAttribute('card-type') === CARD_TYPE.CREATE) this.removeCard();
  }

  handleClickSubmitButton(e) {
    e.stopPropagation();

    const inputTitle = this.shadowRoot.querySelector('input.card__title');
    if (!inputTitle.value) return;

    const descriptionTextArea = this.shadowRoot.querySelector('textarea.card__desc');

    const cardStatus = this.getAttribute('card-status');
    const cardType = this.getAttribute('card-type');

    if (cardType === CARD_TYPE.CREATE) {
      createTodo(cardStatus, inputTitle.value, descriptionTextArea.value)
        .then(({ todo_id }) => {
          const dataList = JSON.parse(document.querySelector('main-page').getAttribute('data-list'));
          const newDataList = [
            {
              todo_id,
              status: cardStatus,
              title: inputTitle.value,
              description: descriptionTextArea.value,
            },
            ...dataList,
          ];
          document.querySelector('main-page').setAttribute('data-list', JSON.stringify(newDataList));
        })
        .catch((err) => console.log(err));
    } else if (cardType === CARD_TYPE.MODIFY) {
      const cardId = this.getAttribute('card-id');

      updateTodo(cardId, cardStatus, inputTitle.value, descriptionTextArea.value).then(() => {
        const dataList = JSON.parse(document.querySelector('main-page').getAttribute('data-list'));
        dataList.forEach((todoData) => {
          if (todoData.todo_id === Number(cardId)) {
            todoData.title = inputTitle.value;
            todoData.description = descriptionTextArea.value;
          }
        });
        document.querySelector('main-page').setAttribute('data-list', JSON.stringify(dataList));
      });
    }
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
    this.addEvent('pointerdown', '.card', this.handlePickUpCard.bind(this));
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
          <img src=${IconClose} alt="??????" />
        </button>
      </div>
      <p class="card__desc">${this.getAttribute('description')}</p>
    </div>
    `;
  }

  getModifyCardTemplate() {
    return `
    <div class="card modify">
      <div class="card__header">
        <input class="card__title" placeholder="????????? ???????????????." value=${this.getAttribute('title') || 'a'} />
      </div>
      <textarea class="card__desc" placeholder="????????? ??????????????????.">${this.getAttribute('description')}</textarea>
      <div class="card__button__wrapper">
        <custom-button class="card__cancel-btn" text="??????"></custom-button>
        <custom-button class="card__submit-btn" type="primary" text="??????"></custom-button>
      </div>
    </div>`;
  }

  getCreateCardTemplate() {
    return `
    <div class="card" tabindex="0">
      <div class="card__header">
        <input class="card__title" placeholder="????????? ???????????????." />
      </div>
      <textarea class="card__desc" placeholder="????????? ??????????????????."></textarea>
      <div class="card__button__wrapper">
        <custom-button class="card__cancel-btn" text="??????"></custom-button>
        <custom-button class="card__submit-btn" type="primary" text="??????"></custom-button>
      </div>
    </div>`;
  }

  static get observedAttributes() {
    return ['title', 'description', 'card-type'];
  }
}

export default Card;
