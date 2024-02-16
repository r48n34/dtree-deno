import { assertEquals } from "https://deno.land/std@0.216.0/assert/mod.ts";
import { dirTree } from '../src/dir-tree-creator.ts';

Deno.test("url test", async () => {

    const expectedStr = `📂 .
├── deno.json
├── deno.lock
├── LICENSE
├── README.md
├─┬ 📂 src
│ ├── archy.ts
│ ├── dir-tree-creator.ts
│ ├── help.ts
│ ├── index.ts
│ └─┬ 📂 interface
│   └── interface.ts
└─┬ 📂 test
  └── general.test.ts`

    const trereStr = await dirTree(
        Deno.cwd(),
        { 
            label: '.',
            showsHiddenFolder: false,
            maxDepth: Infinity,
            noIcon: false,
            icon: "📂"
        },
    );

    assertEquals(trereStr, expectedStr);
});