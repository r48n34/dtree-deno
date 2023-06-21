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
                type: "boolean",
            },
            {
                name: "noCopy",
                aliases: ["n", "noCopy"],
                standalone: true,
                type: "boolean",
            }
        ],
    });

    const showsHiddenFolder:boolean = flags.showsHiddenFolder;
    const noCopy:boolean = flags.noCopy;

    const tree = dirTree(Deno.cwd(), {label: ".", showsHiddenFolder: showsHiddenFolder});
    console.log(tree);

    if(!noCopy){
        await clippy.write_text(tree);
        console.log("Success to copy to your clipboard.");
    }
}

if (import.meta.main) {
  main();
}