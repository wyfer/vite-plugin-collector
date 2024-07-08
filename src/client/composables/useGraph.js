
import { useServerStore } from "@/stores/server.js";

export default function () {
  function generateDotFile(jsonData) {
    const sourcePath = jsonData.sourcePath;
    const dependencies = jsonData.resolvies;

    let dotContent = `digraph Dependencies {
      \n
      ordering="out" rankdir="LR" splines="ortho" overlap="false" nodesep="0.16" ranksep="0.18" fontname="Helvetica-bold" fontsize="12" style="rounded,bold,filled" fillcolor="#ffffff" compound="true"
      node [shape="box" height="0.2" color="#ff855c" fontcolor="black"  fontname="Helvetica" fontsize="12" textAnchor="start", style="rounded"]
      edge [arrowhead="normal" arrowsize="0.6" penwidth="2.0" color="#ff855c" fontname="Helvetica" fontsize="9" color="#696cfd",]
      graph [bgcolor="#eaeaff", fontsize=10];        
      \n
    `;

    dotContent += `  "${sourcePath}" [shape=box] [shape=box, style=filled, fillcolor="#f25c98"];\n`;

    dependencies.forEach(dependency => {
      dotContent += `  "${dependency}" [shape=box];\n`; // Add dependency as node
      dotContent += `  "${dependency}" -> "${sourcePath}";\n`; // Add edge from source to dependency
    });

    dotContent += "}";

    const buildHtml = (graph) => {


      const { serverUrl } = useServerStore();

      return `
      <!DOCTYPE html >
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Dependency Graph</title>
            <style>
              body {
                background: #eaeaff;
                }
            </style>
          </head>
          <body>
            <div id="pageLoadingId">Loading...</div>
            <div id="container"></div>
            
            <script src="${serverUrl}/vendor/viz-standalone.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@viz-js/viz@3.5.0/lib/viz-standalone.min.js"></script>
            <script type="module">
              Viz.instance().then(function (viz) {
                var svg = viz.renderSVGElement('${graph.replace(/(\r\n|\n|\r)/gm, " ")}')
                document.getElementById('pageLoadingId').remove();
                document.getElementById('container').appendChild(svg)
              })
            </script>
            <script src="${serverUrl}/vendor/panzoom.min.js"></script>
            <script src="https://unpkg.com/@panzoom/panzoom@4.5.1/dist/panzoom.min.js"></script>
            <script>
              const elem = document.querySelector('body')
              const panzoom = Panzoom(elem, {
                maxScale: 5,
              })
              elem.parentElement.addEventListener(
              'wheel',
              panzoom.zoomWithWheel,
              {passive: false }
              )
            </script>
          </body>
        </html>
    `
    }

    return "data:text/html;base64," + btoa(buildHtml(dotContent));
  }

  return { generateDotFile }
}