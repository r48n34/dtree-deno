// References: https://github.com/manidlou/dir-tree-creator
import * as path from "https://deno.land/std@0.191.0/path/mod.ts";
import { archy } from "./archy.ts";

import klawSync from "npm:klaw-sync";
import { KlawSyncObject, Nodes } from "./interface/interface.ts";

function addNode(
    tree: Nodes,
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
            }
            else if (typeof n === "object" && n.label !== par) {
                addNode(n, par, node);
            }
        });
    }
}

export function dirTree(root: string, opts: { label: string, showsHiddenFolder: boolean }): string {

    opts.label = opts.label || path.basename(root);

    const filterFunc = (item: KlawSyncObject) => {

        console.log(item.path);

        // Default do not shows node_modules
        if (item.path.includes("node_modules")) {
            return false;
        }

        // Don't hide hidden Folder like ".git", ".vscode"
        if (opts.showsHiddenFolder) {
            return true
        }

        const basename = path.basename(item.path);
        return basename === "." || basename[0] !== ".";
    };

    //📂

    const paths = klawSync(root, { filter: filterFunc }).map( (v: KlawSyncObject) => v.path )

    const tree = {
        label: opts.label || ".",
        nodes: [],
    };

    for (let i = 0; i < paths.length; i++) {
        const p = paths[i];
        const par = path.dirname(p);

        console.log(par);

        if (par === root) {
            addNode(tree, opts.label, path.basename(p));
        }
        else {
            addNode(tree, path.basename(par) , path.basename(p));
        }
    }

    return archy(tree).trim()
}
