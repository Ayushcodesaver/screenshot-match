import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import maisonCss from "../maison/maison.css?url";
import bodyHtml from "../maison/body.html?raw";
import runwayJs from "../maison/runway.js.txt?raw";

const TITLE = "Maison Vell";
const DESC =
  "A runway lookbook where six looks stand in a line into the distance and every drag brings the next one to the front.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Michroma&display=swap",
      },
      { rel: "stylesheet", href: maisonCss },
    ],
  }),
  component: Index,
});

let started = false;

function Index() {
  useEffect(() => {
    if (started) return;
    started = true;
    // Runs the original vanilla lookbook script against the markup below.
    new Function(runwayJs)();
  }, []);
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
