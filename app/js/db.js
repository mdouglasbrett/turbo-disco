import Dexie from "https://cdn.skypack.dev/pin/dexie@v3.0.3-c3n0iJSdyDHeMevyDHVi/mode=imports,min/optimized/dexie.js";

self.addEventListener("message", handleWorkerMessage);

function handleWorkerMessage(message) {
  var { data } = message;
  switch (data.command) {
    case "createToDo":
      // TODO: dexie stuff...
      //  Success case, TODO: error case to follow
      self.postMessage({
        command: "confirmToDo",
        payload: `Here's what you wanted me to CREATE: ${
          JSON.stringify(
            data.payload,
          )
        }`,
      });
      break;
    case "editToDo":
      self.postMessage({
        command: "confirmToDo",
        payload: `Here's what you wanted me to EDIT: ${
          JSON.stringify(data.payload)
        }`,
      });
    default:
      break;
  }
}
