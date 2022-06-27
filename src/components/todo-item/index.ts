customElements.define(
  "todo-item",
  class extends HTMLElement {
    shadow: ShadowRoot;
    title: string;
    checked: boolean;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.title = this.getAttribute("title") || "";
      this.checked = this.hasAttribute("checked");
      // getAttribute obtiene el valor de un atributo y lo transforma a una string en Js
      // hasAttribute "pregunta" si el objeto tiene el atributo y arroja un boolean
      this.id = this.getAttribute("id");

      const style = document.createElement("style");
      style.innerHTML = `
      .root{
        background-color: lightgreen;
        border-radius: 3px;
        border: 1px red solid;
        padding: 22px 13px;
        width: 80%;
        margin: 10px 0 0 0;
        }
      .checked{
        text-decoration: line-through;
      }
      `;
      this.shadow.appendChild(style);
      this.render();
    }

    addListeners() {
      const checkEl = this.shadow.querySelector(".checkbox-input");
      checkEl.addEventListener("click", (e) => {
        const target = e.target as any;
        const event = new CustomEvent("change", {
          detail: {
            id: this.id,
            value: target.checked,
          },
        });
        this.dispatchEvent(event);
      });
    }

    render() {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="root">
        <h4 class="${this.checked ? "checked" : ""}">${this.title}</h4>
        <div>
         <input class="checkbox-input" type="checkbox" ${this.checked ? "checked" : ""}>
        </div>
      </div>
      `;
      this.shadow.appendChild(div);
      this.addListeners();
    }
  }
);
