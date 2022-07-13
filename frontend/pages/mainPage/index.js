import Component from '../../components/core/component.js';
import pageStyle from './style.css';

export default class MainPage extends Component {
  setStyle() {
    this.styles.textContent = pageStyle;
  }

  setTemplate() {
    const todoTitle = 'Woowa! Todo🚀';
    const projectTitle = 'Todo Project!';
    const projectDesc = '신지호, 김경민이 함께하는 todo project 입니다. with vanilla JS, nodeJS, web component API ...';
    return `
        <div class="main__container">
          <todo-header text=${todoTitle}></todo-header>
          <div class="contents__container">
            <div class="project-header">
              <h1>${projectTitle}</h1>
              <p>${projectDesc}</p>
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
