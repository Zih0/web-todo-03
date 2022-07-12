import Component from '../core/component.js';
import NotificationPanelStyle from './NotificationPanel.css';
import IconClose from '../../assets/icons/close.svg';

class NotificationPanel extends Component {
  constructor() {
    super();
  }
  setStyle() {
    this.styles.textContent = NotificationPanelStyle;
  }
  setTemplate() {
    return `<div class ='panel-wrapper'> 
                <div class='panel'>
                     <div class = 'top-content'>
                        <p>알림</p>
                        <div class ='close-button'>
                        <img src=${IconClose} alt='닫기'/>
                    </div>
                    </div>
                    <div class = 'main-content'>
                  
                </div>
                </div>
            </div>`;
  }
}
export default NotificationPanel;
