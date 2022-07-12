import Component from '../../components/core/component';
import KanvanBoard from '../../components/kavanBoard.ts/kanvanBoard';
import './style.scss';

export default class MainPage extends Component<void, void> {
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
      `;
  }

  setComponents() {
    return {
      main__kanvan__todo: new KanvanBoard(),
      main__kanvan__progress: new KanvanBoard(),
      main__kanvan__done: new KanvanBoard(),
    };
  }
}

customElements.define('main-page', MainPage);
