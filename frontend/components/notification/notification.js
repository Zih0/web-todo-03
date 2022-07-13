import Component from '../core/component.js';
import NotificationStyle from './notification.css';

const TODO_ACTION_TYPE = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  MOVE: 'MOVE',
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
    const emogi = this.setEmogi('create');
    const author = '경민';
    const notification = '해야할 일에 컴포넌트 리팩터링을 등록하였습니다.';
    const time = '1분';

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
