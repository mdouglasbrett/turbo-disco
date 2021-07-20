// TODO: I am going to have to use importScripts here rather than raw `import`

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
