import { getElapsedTime } from '../../utils/dateUtil.js';
import Component from '../core/component.js';
import NotificationStyle from './notification.css';

const TODO_ACTION_TYPE = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  MOVE: 'move',
};
const TODO_KANVAN_TYPE = {
  TODO: 'todo',
  PROGRESS: 'progress',
  DONE: 'done',
};
const TODO_ACTION_EMOGI = {
  [TODO_ACTION_TYPE.CREATE]: '🥳',
  [TODO_ACTION_TYPE.UPDATE]: '🛠',
  [TODO_ACTION_TYPE.MOVE]: '🚀',
  [TODO_ACTION_TYPE.DELETE]: '👻',
};
const TODO_ACTION_KOREAN = {
  [TODO_ACTION_TYPE.CREATE]: '등록',
  [TODO_ACTION_TYPE.UPDATE]: '수정',
  [TODO_ACTION_TYPE.MOVE]: '이동',
  [TODO_ACTION_TYPE.DELETE]: '삭제',
};
const TODO_KANVAN_KOREAN = {
  [TODO_KANVAN_TYPE.TODO]: '해야 할 일',
  [TODO_KANVAN_TYPE.PROGRESS]: '하고 있는 일',
  [TODO_KANVAN_TYPE.DONE]: '완료한 일',
};
const NOTIFICATION_FORMAT = {
  [TODO_ACTION_TYPE.CREATE]: () => `<p><span>${todo}</span>이<span>${action}</span>되었습니다.</p>`,
  [TODO_ACTION_TYPE.UPDATE]: () => `<p><span>${todo}</span>이<span>${action}</span>되었습니다.</p>`,
  [TODO_ACTION_TYPE.MOVE]: () =>
    `<p><span>${todo}</span>가<span>${kanvans[0]}</span>에서 <span>${kanvans[1]}</span>로<span>${action}</span>되었습니다.</p>`,
  [TODO_ACTION_TYPE.DELETE]: () => `<p><span>${todo}</span>이<span>${action}</span>되었습니다.</p>`,
};

class Notification extends Component {
  constructor() {
    super();
  }
  setStyle() {
    this.styles.textContent = NotificationStyle;
  }
  setEmogi(action) {
    return TODO_ACTION_EMOGI[action];
  }
  getNotification(action, todo, kanvans) {
    const [preKanvan, curKanvan] = kanvans.split(',');

    if (action === TODO_ACTION_TYPE.MOVE) {
      return `<p><span>${todo}</span>가<span>${TODO_KANVAN_KOREAN[preKanvan]}</span>에서 <span>${TODO_KANVAN_KOREAN[curKanvan]}</span>로<span>${TODO_ACTION_KOREAN[action]}</span>되었습니다.</p>`;
    } else
      return `<p><span>${preKanvan}</span>에서<span>${todo}</span>이<span>${TODO_ACTION_KOREAN[action]}</span>되었습니다.</p>`;
  }

  setTemplate() {
    const data = JSON.parse(this.getAttribute('data'));
    const time = getElapsedTime(data.cdate);
    const notification = this.getNotification(data.action, data.title, data.kanvans);
    const emogi = this.setEmogi(data.action);
    const author = '우캠이';

    return `
            <div class="noti-wrapper">
            <span class="emogi">${emogi}</span>
            <div class="noti-contents">
                <span class="author">@${author}</span>
                <div class="noti">${notification}</div>
                <span class="time">${time}</span>
            </div>
            </div>
        `;
  }
  static get observedAttributes() {
    return ['data'];
  }
}
export default Notification;
