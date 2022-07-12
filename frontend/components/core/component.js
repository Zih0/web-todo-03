class Component extends HTMLElement {
  template;
  styles;
  constructor() {
    super();

    this.template = document.createElement('template');
    this.styles = document.createElement('style');
  }

  setStyle() {
    return;
  }

  setTemplate() {
    return '';
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.template.innerHTML = this.setTemplate();
    this.setStyle();

    this.shadowRoot?.append(this.styles, this.template.content.cloneNode(true));
  }
}
export default Component;
