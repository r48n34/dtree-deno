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
Using this repo for samples, the cli will output this result.

```bash
dtree
```

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

---

The `--hidden` or `-h` flag will include the '.' folder output this result.

```bash
dtree --hidden
```

```md
PS D:\github-repo\dtree > dtree --hidden
.
├─┬ .git
│ └── ...
├── .gitignore
├─┬ .vscode
│ └── ...
├── deno.json
├── deno.lock
├── README.md
└─┬ src
  ├── dir-tree-creator.ts
  └── index.ts
Success to copy to your clipboard.
```

---

The `--noCopy` or `-n` flag will not auto copy the result.

```bash
dtree --noCopy
```

```md
PS D:\github-repo\dtree > dtree --noCopy
.
├── deno.json
├── deno.lock
├── README.md
└─┬ src
  ├── dir-tree-creator.ts
  └── index.ts
```

---
The `--maxDepth` or `-m` flag can set the max depth generate to the tree.  
Default: `Infinity`
```bash
dtree --noCopy
```

```md
# Set a max depth to 1
PS D:\github-repo\dtree> dtree -m 1
.
├── deno.json
├── deno.lock
├── README.md
└── src
Success to copy to your clipboard.
```

## Notices
The script will default to ignore all `__pycache__` and `node_modules` related files. Unless you are using the command inside either one of the folder.