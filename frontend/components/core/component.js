class Component extends HTMLElement {
  template;
  styles;
  constructor() {
    super();

    this.template = document.createElement('template');
    this.styles = document.createElement('style');

    this.attachShadow({ mode: 'open' });
    this.init();

    this.reRender = this.render.bind(this);
  }

  init() {
    this.render();
    this.addEvent();
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

  addEvent() {
    return;
  }

  render() {
    this.template.innerHTML = this.setTemplate();
  }

  connectedCallback() {
    this.setStyle();
    this.shadowRoot?.append(this.styles, this.template.content.cloneNode(true));

    this.setEvent();
  }

  /*
   * DOM Unmount
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
  attributeChangedCallback(name, oldValue, newValue) {}
}
export default Component;
