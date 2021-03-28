import { html, LitElement } from "../deps.js";

export class ToDoList extends LitElement {
    _handleChange() {
        return console.log('changed input state');
    }

  render() {
    return (
      html`<ul>
              <li>
                <label for="checkbox-1">
                  <input @change=${this._handleChange} type="checkbox" name="checkbox-1" id="checkbox-1"/>
                  Item One
                </label>
              </li>
              <li>
                <label for="checkbox-2">
                  <input type="checkbox" name="checkbox-2" id="checkbox-2" />
                Item Two
                </label>
              </li>
            </ul>`
    );
  }
}
