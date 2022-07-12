import CustomButton from './components/button/button.js';
import Card from './components/card/card.js';
import KanvanBoard from './components/kanvanBoard/kanvanBoard.js';
import AlertModal from './components/modal/alertModal.js';
import MainPage from './pages/mainPage/index.js';

window.addEventListener('DOMContentLoaded', () => {
  customElements.define('custom-button', CustomButton);
  customElements.define('todo-card', Card);
  customElements.define('todo-kanvan', KanvanBoard);
  customElements.define('main-page', MainPage);
  customElements.define('alert-modal', AlertModal);
});
