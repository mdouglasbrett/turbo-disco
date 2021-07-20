// Deno static file server adapted from this gist: https://gist.github.com/kitsonk/f8210d2f802a0e5396abda32552be0dc
// (kitsonk is the author of the Oak server)
// TODO: move these out to deps
import {
  bold,
  cyan,
  green,
  red,
  yellow,
} from "https://deno.land/std@0.91.0/fmt/colors.ts";

import { Application, HttpError, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

// Error handler middleware
app.use(async (context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
    if (e instanceof HttpError) {
      // If we can't find something for whatever reason, send them back home
      context.response.redirect("/");
    } else if (e instanceof Error) {
      context.response.status = 500;
      context.response.body = `<!DOCTYPE html>
        <html>
            <body>
            <h1>500 - Internal Server Error</h1>
            </body>
        </html>`;
      console.log("Unhandled Error:", red(bold(e.message)));
      console.log(e.stack);
    }
  }
});

// Logger
app.use(async (context, next) => {
  await next();
  const rt = context.response.headers.get("X-Response-Time");
  console.log(
    `${green(context.request.method)} ${
      cyan(
        context.request.url.pathname,
      )
    } - ${bold(String(rt))}`,
  );
});

// Response Time
app.use(async (context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Send app content
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/app`,
    index: "index.html",
    extensions: ["html"],
  });
});

const address = "localhost:8000";
console.log(bold("Start listening on ") + yellow(address));
await app.listen(address);
