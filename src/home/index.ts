import { state } from "../state";

export function initHomepage(container) {
  const div = document.createElement("div");
  const tasks = state.getEnabledTasks();

  div.innerHTML = `
  <h1>Mis pendientes</h1>
  <button class="add-button">Agregar tarea</button>
  <ul class="lista"></ul>
  `;

  const listaEl = div.querySelector(".lista");

  function createTask(items) {
    listaEl.innerHTML = "";
    for (const item of items) {
      const toDoItemEl = document.createElement("todo-item");
      toDoItemEl.setAttribute("title", item.title);
      toDoItemEl.setAttribute("id", item.id);
      if (item.completed) {
        toDoItemEl.setAttribute("checked", "true");
      }
      toDoItemEl.addEventListener("change", (e: any) => {
        state.changeItemState(e.detail.id, e.detail.value);
      });
      listaEl.appendChild(toDoItemEl);
    }
  }

  state.subscribe(() => {
    createTask(state.getEnabledTasks());
  });

  createTask(tasks);

  div.querySelector(".add-button").addEventListener("click", () => {
    state.addTask(Math.trunc(Math.random() * 100), "Task desde el botón");
  });
  container.appendChild(div);
}
