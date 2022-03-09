import * as monaco from "monaco-editor";

self.MonacoEnvironment = {
  getWorker: function (workerId, label) {
    const getWorkerModule = (moduleUrl, label) => {
      // @ts-ignore
      return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
        name: label,
        type: "module",
      });
    };

    switch (label) {
      case "json":
        return getWorkerModule(
          "/monaco-editor/esm/vs/language/json/json.worker?worker",
          label
        );
      case "css":
      case "scss":
      case "less":
        return getWorkerModule(
          "/monaco-editor/esm/vs/language/css/css.worker?worker",
          label
        );
      case "html":
      case "handlebars":
      case "razor":
        return getWorkerModule(
          "/monaco-editor/esm/vs/language/html/html.worker?worker",
          label
        );
      case "typescript":
      case "javascript":
        return getWorkerModule(
          "/monaco-editor/esm/vs/language/typescript/ts.worker?worker",
          label
        );
      default:
        return getWorkerModule(
          "/monaco-editor/esm/vs/editor/editor.worker?worker",
          label
        );
    }
  },
};
