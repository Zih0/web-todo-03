import Component from '../../components/core/component.js';
import pageStyle from './style.css';

const DUMMY = [
  {
    todo_id: 1,
    status: 'todo',
    title: 'dfsdf',
    description: 'dfssdf',
  },
  {
    todo_id: 12,
    status: 'progress',
    title: 'dfsdf',
    description: 'dfssdf',
  },
  {
    todo_id: 13,
    status: 'progress',
    title: 'dfsdf',
    description: 'dfssdf',
  },
  {
    todo_id: 14,
    status: 'done',
    title: 'dfsdf',
    description: 'dfssdf',
  },
  {
    todo_id: 15,
    status: 'todo',
    title: 'dfsdf',
    description: 'dfssdf',
  },
  {
    todo_id: 16,
    status: 'todo',
    title: 'dfsdf',
    description: 'dfssdf',
  },
];

export const TODO_STATUS = {
  TODO: 'todo',
  PROGRESS: 'progress',
  DONE: 'done',
};

export default class MainPage extends Component {
  constructor() {
    super();

    this.getTodoData();
    this.reRender();
  }

  setStyle() {
    this.styles.textContent = pageStyle;
  }

  getTodoData() {
    const todoData = DUMMY;

    this.setAttribute('data-list', JSON.stringify(todoData));
  }

  filterDataList() {
    const dataList = this.getAttribute('data-list') ? JSON.parse(this.getAttribute('data-list')) : [];

    this.todos = dataList.filter((data) => data.status === TODO_STATUS.TODO);
    this.progresses = dataList.filter((data) => data.status === TODO_STATUS.PROGRESS);
    this.dones = dataList.filter((data) => data.status === TODO_STATUS.DONE);
  }

  setTemplate() {
    this.filterDataList();

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
              <todo-kanvan id="main__kanvan__todo" title="todo" data-list='${
                JSON.stringify(this.todos) ?? []
              }'></todo-kanvan>
              <todo-kanvan id="main__kanvan__progress" title="progress" data-list='${
                JSON.stringify(this.progresses) ?? []
              }'></todo-kanvan>
              <todo-kanvan id="main__kanvan__done" title="done" data-list='${
                JSON.stringify(this.dones) ?? []
              }'></todo-kanvan>
            </div>
          </div>
        </div>
      `;
  }

  static get observedAttributes() {
    return ['data-list'];
  }
}

{
  /* <todo-kanvan id="main__kanvan__progress"></todo-kanvan>
              <todo-kanvan id="main__kanvan__done"></todo-kanvan> */
}
