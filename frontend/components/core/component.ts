class Component extends HTMLElement {
  template: HTMLTemplateElement;
  styles: HTMLStyleElement;
  constructor() {
    super();

    this.template = document.createElement('template');
    this.styles = document.createElement('style');
  }

  setStyle(): void {
    return;
  }

  setTemplate(): void {
    return;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.setTemplate();
    this.setStyle();

    this.shadowRoot?.append(this.styles, this.template.content.cloneNode(true));
  }
}
export default Component;