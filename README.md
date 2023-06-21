# dtree-deno
A simple CLI for generate the dir tree with deno.

## Install
1. Git clone the project first
```bash
git clone https://github.com/r48n34/dtree-deno.git
```

2. Install with deno taks
```bash
deno task install
```

3. Run with dtree
```bash
dtree
```

## Result
Using this dir for samples, the fecture will output this result.

```md
PS D:\github-repo\dtree > dtree
.
├── deno.json
├── deno.lock
├── README.md
└─┬ src
  ├── dir-tree-creator.ts
  └── index.ts
Success to copy to your clipboard.
```