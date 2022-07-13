import Component from '../core/component.js';
import NotificationStyle from './notification.css';

class Notification extends Component {
  constructor() {
    super();
  }
  setStyle() {
    this.styles.textContent = NotificationStyle;
  }
  setEmogi(action) {
    switch (action) {
      case 'create':
        return '🥳';
        break;
      case 'update':
        return '🛠';
        break;
      case 'delete':
        return '👻';
        break;
      case 'move':
        return '🚀';
        break;
    }
  }

  setTemplate() {
    const emogi = this.setEmogi('create');
    const author = '경민';
    const notification = '해야할 일에 컴포넌트 리팩터링을 등록하였습니다.';
    const time = '1분';
    //현재 시간, 알림 생성 시간 비교해서 string 뽑아내는 로직
    // notification 에 action, status, todo 만 강조
    //notification action 에 따라 emogi 변경 로직
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
