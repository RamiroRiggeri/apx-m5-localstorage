import "./components/text/index";
import "./components/todo-item/index";
import { initHomepage } from "./home/index";
import { state } from "./state";

(function () {
  state.init();
  initHomepage(document.querySelector(".root"));
})();
