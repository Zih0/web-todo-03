import CustomButton from './components/button/button';
import './style/style.scss';

window.addEventListener('DOMContentLoaded', () => {
  customElements.define('custom-button', CustomButton);
});
