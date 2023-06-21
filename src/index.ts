import { dirTree } from "./dir-tree-creator.ts";
import * as clippy from "https://deno.land/x/clippy@v0.2.2/mod.ts";

function dirTreeAwait(dirPath: string): Promise<string>{
    return new Promise( (rec, rej) => {
        dirTree(dirPath, { label: '.' }, (err: string, tr: string) => {
            if (err) return rej(err)
            rec(tr)
        })
    })
}

async function main() {
    const tree = await dirTreeAwait(Deno.cwd());
    console.log(tree);

    await clippy.write_text(tree);
    console.log("Success to copy to your clipboard.");
}

if (import.meta.main) {
  main();
}