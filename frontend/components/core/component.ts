interface ComponentsType {
  [key: string]: any;
}

export default class Component<S = void, P = void> extends HTMLElement {
  state: S | undefined;
  props: P;
  components: ComponentsType;

  constructor(props: P) {
    super();
    this.props = props;

    this.components = {};

    this.init();
  }

  init(): void {
    this.render();
    this.addEvent();
  }
  addEvent(): void {
    return;
  }

  render(): void {
    this.components = this.setComponents();
    this.innerHTML = this.setTemplate();
    this.setLayout();
    this.componentDidMount();
  }

  //innerHTML
  setTemplate(): string {
    return '';
  }

  //컴포넌트를 각 위치에 맞게 replace
  setLayout(): void {
    for (const [key, Comp] of Object.entries(this.components)) {
      const $$ = this.querySelector(`#${key}`);
      $$?.replaceWith(Comp);
    }
  }

  componentDidMount(): void {
    return;
  }

  //사용하는 컴포넌트 init
  setComponents(): { [key: string]: any } {
    return {};
  }
}
