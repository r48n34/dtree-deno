import { assertStringIncludes } from "https://deno.land/std@0.216.0/assert/mod.ts";
import { dirTree } from '../src/dir-tree-creator.ts';
import * as path from "https://deno.land/std@0.190.0/path/mod.ts";

Deno.test("Normal src folder test", async () => {

    const expectedStrList = [
        "📂 .",
        "archy.ts",
        "dir-tree-creator.ts",
        "help.ts",
        "index.ts",
        "📂 interface",
        "interface.ts",
    ]
    
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

Deno.test("Normal src folder test with -m maxDepth 1", async () => {

    const expectedStrList = [
        "📂 .",
        "archy.ts",
        "dir-tree-creator.ts",
        "help.ts",
        "index.ts",
        "📂 interface",
    ]
    
    const trereStr = await dirTree(
        path.join(Deno.cwd(), "src"),
        { 
            label: '.',
            showsHiddenFolder: false,
            maxDepth: 1,
            noIcon: false,
            icon: "📂"
        },
    );

    for(const str of expectedStrList){
        assertStringIncludes(trereStr, str);
    }
});

Deno.test("Normal src folder test with other icon 📦", async () => {

    const expectedStrList = [
        "📦 .",
        "archy.ts",
        "dir-tree-creator.ts",
        "help.ts",
        "index.ts",
        "📦 interface",
        "interface.ts",
    ]
    
    const trereStr = await dirTree(
        path.join(Deno.cwd(), "src"),
        { 
            label: '.',
            showsHiddenFolder: false,
            maxDepth: Infinity,
            noIcon: false,
            icon: "📦"
        },
    );

    for(const str of expectedStrList){
        assertStringIncludes(trereStr, str);
    }
});

Deno.test("Normal src folder test with --noIcon", async () => {

    const expectedStrList = [
        ".",
        "archy.ts",
        "dir-tree-creator.ts",
        "help.ts",
        "index.ts",
        "interface",
        "interface.ts",
    ]
    
    
    const trereStr = await dirTree(
        path.join(Deno.cwd(), "src"),
        { 
            label: '.',
            showsHiddenFolder: false,
            maxDepth: Infinity,
            noIcon: true,
            icon: "📦" // Does not matter when noIcon is true
        },
    );

    for(const str of expectedStrList){
        assertStringIncludes(trereStr, str);
    }
});