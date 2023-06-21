import { dirTree } from "./dir-tree-creator.ts";
import * as clippy from "https://deno.land/x/clippy@v0.2.2/mod.ts";
import { parseFlags } from "https://deno.land/x/cliffy@v0.25.7/flags/mod.ts";

async function main() {
    const { flags } = parseFlags(Deno.args, {
        flags: [
            {
                name: "showsHiddenFolder",
                aliases: ["h", "hidden"],
                standalone: false,
                type: "boolean"
            },
            {
                name: "noCopy",
                aliases: ["n", "noCopy"],
                standalone: false,
                type: "boolean"
            },
            {
                name: "maxDepth",
                aliases: ["m", "maxDepth"],
                standalone: false,
                default: Infinity,
                type: "integer",
            },
            {
                name: "help",
                aliases: ["help"],
                standalone: true,
                type: "boolean"
            }
        ],
    });

    if(flags.help){
        console.log("dtree-deno");
        console.log("");

        console.log("Show Hidden Folder   --hidden -h");
        console.log("No Copy              --noCopy -n");
        console.log("Set Max Depth        --maxDepth <number> -m <number>");
        return
    }

    const showsHiddenFolder:boolean = "showsHiddenFolder" in flags ? flags.showsHiddenFolder : false;
    const noCopy:boolean = "noCopy" in flags ? flags.noCopy : false;
    const maxDepth:number = flags.maxDepth;

    const tree = await dirTree(Deno.cwd(), {
        label: ".",
        showsHiddenFolder: showsHiddenFolder,
        maxDepth: maxDepth
    });
    console.log(tree);

    if(!noCopy){
        await clippy.write_text(tree);
        console.log("Success to copy to your clipboard.");
    }
}

if (import.meta.main) {
  main();
}