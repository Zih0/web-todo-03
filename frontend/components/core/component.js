class Component extends HTMLElement {
  template;
  styles;
  constructor() {
    super();

    this.template = document.createElement('template');
    this.styles = document.createElement('style');

    this.attachShadow({ mode: 'open' });
    this.init();
  }

  init() {
    this.render();
    this.setStyle();
    this.shadowRoot?.append(this.styles, this.template.content.cloneNode(true));
    // this.addEvent();
  }

  /*
   * 각 컴포넌트에서 shadowDOM에 넣을 style을 삽입해줍니다.
   */
  setStyle() {}

  /*
   * 웹컴포넌트 innerHTML
   */
  setTemplate() {
    return '';
  }

  /*
   * 컴포넌트 이벤트를 넣어줍니다.
   */
  setEvent() {}

  addEvent(event, selector, cb) {
    const children = [...this.shadowRoot.querySelectorAll(selector)];
    const isTarget = (target) => children.includes(target) || target.closest(selector);

    this.shadowRoot.addEventListener(event, (e) => {
      if (isTarget(e.target)) cb(e);
    });
  }

  render() {
    this.template.innerHTML = this.setTemplate();
  }

  reRender() {
    this.render();

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.append(this.styles, this.template.content.cloneNode(true));

    this.setEvent();
  }

  /*
   * componentDidMount
   */
  connectedCallback() {}

  /*
   * componentWillUnmount
   */
  disconnectedCallback() {}

  /*
   * attribute 구독
   */
  static get observedAttributes() {
    return [];
  }

  /*
   * 구독한 attribute가 변경되었을 때, Callback 처리
   */
  attributeChangedCallback(name, oldValue, newValue) {
    this.reRender();
  }
}
export default Component;
