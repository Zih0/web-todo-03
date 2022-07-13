import Component from '../../components/core/component.js';
import pageStyle from './style.css';

export default class MainPage extends Component {
  setStyle() {
    this.styles.textContent = pageStyle;
  }

  setTemplate() {
    return `
        <div class="main__container">
          <todo-header text="Woowa! Todo"></todo-header>
          <div class="contents__container">
            <div class="project-header">
              <h1>Todo Project!</h1>
              <p>신지호, 김경민이 함께하는 todo project 입니다. with vanilla JS, nodeJS, web component API ...</p>
            </div>
            <div class="kanvan__container">
              <todo-kanvan id="main__kanvan__todo"></todo-kanvan>
              <todo-kanvan id="main__kanvan__progress"></todo-kanvan>
              <todo-kanvan id="main__kanvan__done"></todo-kanvan>
            </div>
          </div>
        </div>
      `;
  }
}
