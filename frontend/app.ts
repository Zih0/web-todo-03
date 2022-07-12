import CustomButton from './components/button/button';
import Card from './components/card/card';
import KanvanBoard from './components/kavanBoard.ts/kanvanBoard';
import MainPage from './pages/mainPage';
import './style/style.scss';

window.addEventListener('DOMContentLoaded', () => {
  customElements.define('custom-button', CustomButton);
  customElements.define('todo-card', Card);
  customElements.define('todo-kanvan', KanvanBoard);
  customElements.define('main-page', MainPage);
});
