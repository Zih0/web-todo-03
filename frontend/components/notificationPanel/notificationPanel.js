import Component from '../core/component.js';
import NotificationPanelStyle from './NotificationPanel.css';
import IconClose from '../../assets/icons/close.svg';
import { enableBodyScroll } from '../../utils/styleUtil.js';
const fakeData = [
  {
    action: 'create',
    todo: '할 일을 하자',
    kanvan: 'todo',
  },
  {
    action: 'delete',
    todo: '할 일을 하자',
    kanvan: 'todo',
  },
  {
    action: 'move',
    todo: '할 일을 하자',
    kanvan: 'todo',
  },
  {
    action: 'update',
    todo: '할 일을 하자',
    kanvan: 'todo',
  },
];

class NotificationPanel extends Component {
  constructor() {
    super();
  }
  handleClosePanel() {
    const panel = document.querySelector('#notification-panel').shadowRoot.querySelector('.panel-wrapper');
    panel.classList.remove('open');
    enableBodyScroll();
  }
  setEvent() {
    this.addEvent('click', '.close-button', this.handleClosePanel.bind(this));
  }
  setStyle() {
    this.styles.textContent = NotificationPanelStyle;
  }
  setTemplate() {
    return `<div class='panel-wrapper'> 
                <div class='panel'>
                     <div class='top-content'>
                        <p>알림</p>
                        <div class='close-button'>
                        <img src=${IconClose} alt='닫기'/>
                    </div>
                    </div>
                    <div class='main-content'>
                    ${fakeData
                      .map(
                        (data) =>
                          `<notification-card noti="${data.todo}" time="1" action="${data.action}" ></notification-card>`,
                      )
                      .join('')}
                </div>
                </div>
            </div>`;
  }
}
export default NotificationPanel;
