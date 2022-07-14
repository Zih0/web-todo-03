import Component from '../core/component.js';
import NotificationPanelStyle from './notificationPanel.css';
import IconClose from '../../assets/icons/close.svg';
import { enableBodyScroll } from '../../utils/styleUtil.js';
import { getNotification } from '../../api/notification.js';
class NotificationPanel extends Component {
  constructor() {
    super();
    this.getNotificationList();
  }
  handleClosePanel() {
    const panel = document.querySelector('#notification-panel').shadowRoot.querySelector('.panel-wrapper');
    panel.classList.add('close');
    panel.classList.remove('open');
    setTimeout(() => {
      panel.classList.remove('close');
    }, 1000);
    enableBodyScroll();
  }
  setEvent() {
    this.addEvent('click', '.close-button', this.handleClosePanel.bind(this));
  }
  setStyle() {
    this.styles.textContent = NotificationPanelStyle;
  }
  getNotificationList() {
    getNotification().then((res) => this.setAttribute('notifications', JSON.stringify(res)));
  }
  setTemplate() {
    // const windowHeight = window.innerHeight;

    const notifications = this.getAttribute('notifications') ? JSON.parse(this.getAttribute('notifications')) : [];

    return `<div class='panel-wrapper'> 
                <div class='panel'>
                     <div class='top-content' >
                        <p>알림</p>
                        <div class='close-button'>
                        <img src=${IconClose} alt='닫기'/>
                    </div>
                    </div>
                    <div class='main-content'>
                    ${notifications
                      .map((data) => `<notification-card data = '${JSON.stringify(data)}' ></notification-card>`)
                      .join('')}
                </div>
                </div>
            </div>`;
  }
  static get observedAttributes() {
    return ['notifications'];
  }
}
export default NotificationPanel;
