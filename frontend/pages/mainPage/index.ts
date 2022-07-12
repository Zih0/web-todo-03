import Component from '../../components/core/component';

export default class MainPage extends Component {
  constructor() {
    super();
  }

  setTemplate() {
    return `
        <div class="main__container">
        <div id="main__kanvan__todo"></div>
        <div id="main__kanvan__progress"></div>
        <div id="main__kanvan__done"></div>
        </div>
        <custom-button type="primary" text="등록"></custom-button>
        <todo-kanvan></todo-kanvan>
      `;
  }
}
