export function handleFormSubmit({ form, actionType = "", worker }) {
  return function (event) {
    event.preventDefault();
    const data = new FormData(form);
    var toDo = {};
    for (let [k, v] of data.entries()) {
      toDo[k] = v;
    }
    return worker?.postMessage({ command: actionType, payload: toDo });
  };
}

export function handleWorkerMessage({ data }) {
  var { origin } = new URL(window.location.href);
  switch (data.command) {
    case "confirmToDo":
      console.log(data.payload);
      window.location.href = origin;
      break;
    // TODO: error case
    case "error":
      break;
    default:
      break;
  }
}
