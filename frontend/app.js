import CustomButton from './components/button/button.js';
import Card from './components/card/card.js';
import KanvanBoard from './components/kanvanBoard/kanvanBoard.js';
import NotificationPanel from './components/notificationPanel/notificationPanel.js';
import AlertModal from './components/modal/alertModal.js';
import MainPage from './pages/mainPage/index.js';
import Header from './components/header/header.js';
import Notification from './components/notification/notification.js';

window.addEventListener('DOMContentLoaded', () => {
  customElements.define('custom-button', CustomButton);
  customElements.define('todo-card', Card);
  customElements.define('todo-kanvan', KanvanBoard);
  customElements.define('todo-notification', NotificationPanel);
  customElements.define('main-page', MainPage);
  customElements.define('alert-modal', AlertModal);
  customElements.define('todo-header', Header);
  customElements.define('notification-card', Notification);
});
