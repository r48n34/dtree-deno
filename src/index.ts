import { dirTree } from "./dir-tree-creator.ts";
import * as clippy from "https://deno.land/x/clippy@v0.2.2/mod.ts";
import { parseFlags } from "https://deno.land/x/cliffy@v0.25.7/flags/mod.ts";

function dirTreeAwait(dirPath: string, showsHiddenFolder: boolean = false): Promise<string>{
    return new Promise( (rec, rej) => {
        dirTree(dirPath, { label: '.', showsHiddenFolder: showsHiddenFolder }, (err: string, tr: string) => {
            if (err) return rej(err)
            rec(tr)
        })
    })
}

async function main() {
    const { flags } = parseFlags(Deno.args, {
        flags: [
            {
                name: "showsHiddenFolder",
                aliases: ["h", "hidden"],
                standalone: false,
                type: "boolean",
            }
        ],
    });

    const showsHiddenFolder:boolean = flags.showsHiddenFolder;

    const tree = await dirTreeAwait(Deno.cwd(), showsHiddenFolder);
    console.log(tree);

    await clippy.write_text(tree);
    console.log("Success to copy to your clipboard.");
}

if (import.meta.main) {
  main();
}