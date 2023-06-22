// References: https://github.com/manidlou/dir-tree-creator

import * as path from "https://deno.land/std@0.191.0/path/mod.ts";
import { walk } from "https://deno.land/std@0.192.0/fs/mod.ts";

import { archy } from "./archy.ts";
import { Nodes } from "./interface/interface.ts";

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

export async function dirTree(
    root: string,
    opts: { label: string, showsHiddenFolder: boolean, maxDepth: number }
): Promise<string> {

    opts.label = opts.label || path.basename(root);

    //📂
    const paths = []
    const walkOptions = {
        maxDepth: opts.maxDepth, 
        includeDirs: true,
        skip: [/__pycache__/ , /node_modules/]
    }

    for await (const entry of walk(root, walkOptions)) {

        if(opts.showsHiddenFolder){ // Add all folders
            paths.push(entry.path);
            continue;
        }

        // Add non hidden folders
        const isHiddenFolderStuff = entry.path.split("\\").filter( v => v.startsWith(".") ).length >= 1

        if(!isHiddenFolderStuff){
            paths.push(entry.path);
        }
        
    }

    const tree = {
        label: opts.label || ".",
        nodes: [],
    };

    for (let i = 0; i < paths.length; i++) {
        const p = paths[i];
        const par = path.dirname(p);

        if (par === root) {
            addNode(tree, opts.label, path.basename(p));
        }
        else {
            addNode(tree, path.basename(par) , path.basename(p));
        }
    }

    return archy(tree).trim()
}
