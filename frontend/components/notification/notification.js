import Component from '../core/component.js';
import NotificationStyle from './notification.css';

const TODO_ACTION_TYPE = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  MOVE: 'move',
};
const TODO_ACTION_EMOGI = {
  [TODO_ACTION_TYPE.CREATE]: '🥳',
  [TODO_ACTION_TYPE.UPDATE]: '🛠',
  [TODO_ACTION_TYPE.MOVE]: '🚀',
  [TODO_ACTION_TYPE.DELETE]: '👻',
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

  setTemplate() {
    const time = this.getAttribute('time');
    const notification = this.getAttribute('noti');
    const action = this.getAttribute('action');
    const emogi = this.setEmogi(action);
    const author = '우캠이';

    return `
            <div class="noti-wrapper">
            <span class="emogi">${emogi}</span>
            <div class="noti-contents">
                <span class="author">@${author}</span>
                <span class="noti">${notification}</span>
                <span class="time">${time} 전</span>
            </div>
            </div>
        `;
  }
}
export default Notification;
