import {
  css,
  html,
  LitElement,
} from "https://cdn.skypack.dev/pin/lit-element@v2.5.1-kJPqOtXnmU3W5UnUzeF9/mode=imports,min/optimized/lit-element.js";

class ToDoList extends LitElement {
  static get styles() {
    return css`
      li {
        list-style: none;
      }
    `;
  }

  _handleChange() {
    return console.log("changed input state");
  }

  render() {
    return html` 
    <div class="list-container">
    <ul class="list">
      <!-- TODO: these should be dynamic -->
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
          <input type="checkbox" name="checkbox-2" id="checkbox-2" />
          Item Two
        </label>
        <a href="/edit">Edit</a>
      </li>
    </ul>
    </div>`;
  }
}

customElements.define("todo-list", ToDoList);
