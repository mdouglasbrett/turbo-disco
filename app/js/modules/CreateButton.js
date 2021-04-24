import { html, LitElement } from "../deps.js";

export class CreateButton extends LitElement {
  _handleClick() {
    return console.log("clicked the button");
  }
  render() {
    return html`<button @click=${this._handleClick}>Create</button>`;
  }
}
