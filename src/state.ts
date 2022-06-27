const state = {
  data: {
    tasks: [
      { id: 1, title: "primer item", completed: false },
      { id: 2, title: "segundo item", completed: true },
      { id: 3, title: "tercer item", deleted: true },
    ],
  },
  listeners: [],
  init() {
    const localData = localStorage.getItem("saved-state");
    this.setState(JSON.parse(localData));
  },
  getState() {
    return this.data;
  },
  getEnabledTasks() {
    const currState = this.getState();
    return currState.tasks.filter((t) => !t.deleted);
  },
  addTask(id, title) {
    const currState = this.getState();
    currState.tasks.push({ id, title, completed: false });
    this.setState(currState);
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
    console.log("soy el state", newState);
  },
  changeItemState(id, value) {
    const currState = this.getState();
    const itemFound = currState.tasks.find((t) => t.id == id);
    itemFound.completed = value;
    this.setState(currState);
  },
  subscribe(cb: (any) => any) {
    this.listeners.push(cb);
  },
};

export { state };
