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
          <div class="kanvan__container">
            <todo-kanvan id="main__kanvan__todo"></todo-kanvan>
            <todo-kanvan id="main__kanvan__progress"></todo-kanvan>
            <todo-kanvan id="main__kanvan__done"></todo-kanvan>
          </div>
        </div>
      `;
  }
}
