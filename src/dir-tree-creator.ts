// References: https://github.com/manidlou/dir-tree-creator

import path from "node:path";
import archy from "npm:archy";
import klaw from "npm:klaw";

function addNode(
  tree: { label: string; nodes: any[] },
  par: string,
  node: string,
) {
  if (par === tree.label) {
    tree.nodes.push({
      label: node,
      nodes: [],
    });
  } 
  else {
    tree.nodes.forEach((n) => {
      if (typeof n === "object" && n.label === par) {
        n.nodes.push({
          label: node,
          nodes: [],
        });
      } else if (typeof n === "object" && n.label !== par) {
        addNode(n, par, node);
      }
    });
  }
}

export function dirTree(root: string, opts: { label: string, showsHiddenFolder: boolean }, cb: Function) {
  if (typeof opts === "function") {
    cb = opts;
    opts = {} as any;
  }

  opts.label = opts.label || path.basename(root);

  const paths: string[] = [];
  const filterFunc = (item: string) => {

    // Default do not shows node_modules
    if (item.includes("node_modules")) {
      return false;
    }

    // Don't hide hidden Folder like ".git", ".vscode"
    if(opts.showsHiddenFolder){
      return true
    }

    const basename = path.basename(item);
    return basename === "." || basename[0] !== ".";
  };

  klaw(root, { filter: filterFunc }).on("error", (er: any) => cb(er)).on(
    "data",
    (items: any) => paths.push(items.path),
  )
    .on("end", () => {
      const tree = {
        label: opts.label,
        nodes: [],
      };

      for (let i = 0; i < paths.length; i++ ) {
        const p = paths[i];
        const par = path.dirname(p);

        if (par === root) {
          addNode(tree, opts.label, path.basename(p));
        } 
        else {
          addNode(tree, path.basename(par), path.basename(p));
        }
      }

      return cb(null, archy(tree).trim());
    });
}
