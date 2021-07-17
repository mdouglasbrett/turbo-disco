import {html, css, LitElement} from "../deps.js";

export class ToDoList extends LitElement {
    static get styles() {
        return css`
          li {
            list-style: none;
          }
        `
    }

    _handleChange() {
        return console.log("changed input state");
    }

    render() {
        return html`
          <ul>
            <li>
              <label for="checkbox-1">
                <input
                  @change=${this._handleChange}
                  type="checkbox"
                  name="checkbox-1"
                  id="checkbox-1"
                />
                Item One
              </label>
              <!--        TODO: pretty routes -->
              <a href="/edit">Edit</a>
            </li>
            <li>
              <label for="checkbox-2">
                <input type="checkbox" name="checkbox-2" id="checkbox-2"/>
                Item Two
              </label>
              <a href="/edit">Edit</a>
            </li>
          </ul>`;
    }
}
