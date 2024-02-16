import { assertEquals } from "https://deno.land/std@0.216.0/assert/mod.ts";
import { dirTree } from '../src/dir-tree-creator.ts';
import * as path from "https://deno.land/std/path/mod.ts";

Deno.test("url test", async () => {

    const expectedStr = `📂 .
├── archy.ts
├── dir-tree-creator.ts
├── help.ts
├── index.ts
└─┬ 📂 interface
  └── interface.ts`
    
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

    console.log(trereStr)

    assertEquals(trereStr, expectedStr);
});