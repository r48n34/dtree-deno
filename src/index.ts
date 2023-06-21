import { dirTree } from "./dir-tree-creator.ts";
import * as clippy from "https://deno.land/x/clippy@v0.2.2/mod.ts";
import { parseFlags } from "https://deno.land/x/cliffy@v0.25.7/flags/mod.ts";

function dirTreeAwait(dirPath: string, hideHiddenFolder: boolean = true): Promise<string>{
    return new Promise( (rec, rej) => {
        dirTree(dirPath, { label: '.', hideHiddenFolder: hideHiddenFolder }, (err: string, tr: string) => {
            if (err) return rej(err)
            rec(tr)
        })
    })
}

async function main() {
    const { flags } = parseFlags(Deno.args, {
        flags: [
            {
                name: "hideHiddenFolder",
                aliases: ["h", "hidden"],
                standalone: true,
                type: "boolean",
            }
        ],
    });

    const hideHiddenFolder:boolean = flags.hideHiddenFolder;

    const tree = await dirTreeAwait(Deno.cwd(), hideHiddenFolder);
    console.log(tree);

    await clippy.write_text(tree);
    console.log("Success to copy to your clipboard.");
}

if (import.meta.main) {
  main();
}