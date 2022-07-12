import CustomButton from './components/button/button.js';
import Card from './components/card/card.js';
import KanvanBoard from './components/kavanBoard/kanvanBoard.js';
import NotificationPanel from './components/notificationPanel/notificationPanel.js';
import MainPage from './pages/mainPage/index.js';

window.addEventListener('DOMContentLoaded', () => {
  customElements.define('custom-button', CustomButton);
  customElements.define('todo-card', Card);
  customElements.define('todo-kanvan', KanvanBoard);
  customElements.define('todo-notification', NotificationPanel);
  customElements.define('main-page', MainPage);
});
