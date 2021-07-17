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
        payload: `Here's what you wanted me to create ${JSON.stringify(
          data.payload
        )}`,
      });
      break;
    default:
      break;
  }
}
