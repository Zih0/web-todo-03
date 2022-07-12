import CustomButton from './components/button/button';
import Card from './components/card/card';
import './style/style.scss';

window.addEventListener('DOMContentLoaded', () => {
  customElements.define('custom-button', CustomButton);
  customElements.define('todo-card', Card);
});
