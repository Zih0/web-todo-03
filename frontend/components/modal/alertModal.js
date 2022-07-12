import Component from '../core/component.js';
import alertModalStyle from './alertModal.css';

class AlertModal extends Component {
  setStyle() {
    this.styles.textContent = alertModalStyle;
  }

  setTemplate() {
    return ` 
    <div class="modal">
      <div class="modal__background"></div>
      <div class="modal__content">
        <h5 class="modal__title">선택한 카드를 삭제할까요?</h5>
        <div class="modal__button__wrapper">
          <custom-button text="취소"></custom-button>
          <custom-button type="primary" text="삭제"></custom-button>
        </div>
      </div>
    </div>`;
  }
}

export default AlertModal;
