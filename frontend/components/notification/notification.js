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
  [TODO_ACTION_TYPE.CREATE]: 'đĽł',
  [TODO_ACTION_TYPE.UPDATE]: 'đ ',
  [TODO_ACTION_TYPE.MOVE]: 'đ',
  [TODO_ACTION_TYPE.DELETE]: 'đť',
};
const TODO_ACTION_KOREAN = {
  [TODO_ACTION_TYPE.CREATE]: 'ëąëĄ',
  [TODO_ACTION_TYPE.UPDATE]: 'ěě ',
  [TODO_ACTION_TYPE.MOVE]: 'ě´ë',
  [TODO_ACTION_TYPE.DELETE]: 'ě­ě ',
};
const TODO_KANVAN_KOREAN = {
  [TODO_KANVAN_TYPE.TODO]: 'í´ěź í  ěź',
  [TODO_KANVAN_TYPE.PROGRESS]: 'íęł  ěë ěź',
  [TODO_KANVAN_TYPE.DONE]: 'ěëŁí ěź',
};
const NOTIFICATION_FORMAT = {
  [TODO_ACTION_TYPE.CREATE]: () => `<p><span>${todo}</span>ě´<span>${action}</span>ëěěľëë¤.</p>`,
  [TODO_ACTION_TYPE.UPDATE]: () => `<p><span>${todo}</span>ě´<span>${action}</span>ëěěľëë¤.</p>`,
  [TODO_ACTION_TYPE.MOVE]: () =>
    `<p><span>${todo}</span>ę°<span>${kanvans[0]}</span>ěě <span>${kanvans[1]}</span>ëĄ<span>${action}</span>ëěěľëë¤.</p>`,
  [TODO_ACTION_TYPE.DELETE]: () => `<p><span>${todo}</span>ě´<span>${action}</span>ëěěľëë¤.</p>`,
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
      return `<p><span>${todo}</span>ę°<span>${TODO_KANVAN_KOREAN[preKanvan]}</span>ěě <span>${TODO_KANVAN_KOREAN[curKanvan]}</span>ëĄ<span>${TODO_ACTION_KOREAN[action]}</span>ëěěľëë¤.</p>`;
    } else
      return `<p><span>${preKanvan}</span>ěě<span>${todo}</span>ě´<span>${TODO_ACTION_KOREAN[action]}</span>ëěěľëë¤.</p>`;
  }

  setTemplate() {
    const data = JSON.parse(this.getAttribute('data'));
    const time = getElapsedTime(data.cdate);
    const notification = this.getNotification(data.action, data.title, data.kanvans);
    const emogi = this.setEmogi(data.action);
    const author = 'ě°ěş ě´';

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
