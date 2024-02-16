import { assertStringIncludes } from "https://deno.land/std@0.216.0/assert/mod.ts";
import { dirTree } from '../src/dir-tree-creator.ts';
import * as path from "https://deno.land/std@0.190.0/path/mod.ts";

Deno.test("url test", async () => {

    const expectedStrList = `📂 .
├── archy.ts
├── dir-tree-creator.ts
├── help.ts
├── index.ts
└─┬ 📂 interface
  └── interface.ts`.split("\n")
    
    const trereStr = await dirTree(
        path.join(Deno.cwd(), "src"),
        { 
            label: '.',
            showsHiddenFolder: false,
            maxDepth: Infinity,
            noIcon: false,
            icon: "📂"
        },
    );

    for(const str of expectedStrList){
        assertStringIncludes(trereStr, str);
    }
});