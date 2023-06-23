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
📂 .
├── deno.json
├── deno.lock
├── README.md
└─┬ 📂 src
  ├── dir-tree-creator.ts
  └── index.ts

Success to copy to your clipboard.
```

## Config (Optional)

| name                      | params             | Type    | Description                                     |
| ------------------------- | ------------------ | ------- | ----------------------------------------------- |
| Shows Hidden folder       | `--hidden`, `-h`   | boolean | Will include the '.' folder output this result. |
| No auto copy result       | `--noCopy`, `-n`   | boolean | Will not auto copy the result.                  |
| Set max depth tree        | `--maxDepth`, `-m` | number  | Set the max depth generate to the tree          |
| Set No Icon display       | `--noIcon`         | boolean | Set the tree display without the icon `📂`      |
| Set Icon display          | `--icon`           | string  | Set the tree display icon (Default: `📂`)       |

## More demo

### `--hidden`

The `--hidden` or `-h` flag will include the '.' folder output this result.

```bash
dtree --hidden
```

```md
PS D:\github-repo\dtree > dtree --hidden
📂 .
├─┬ 📂 .git
│ └── ...
├── .gitignore
├─┬ 📂 .vscode
│ └── ...
├── deno.json
├── deno.lock
├── README.md
└─┬ 📂 src
  ├── dir-tree-creator.ts
  └── index.ts

Success to copy to your clipboard.
```

---

### `--noCopy`

The `--noCopy` or `-n` flag will not auto copy the result.

```bash
dtree --noCopy
```

```md
PS D:\github-repo\dtree > dtree --noCopy
📂 .
├── deno.json
├── deno.lock
├── README.md
└─┬ 📂 src
  ├── dir-tree-creator.ts
  └── index.ts
```

---

### `--maxDepth`

The `--maxDepth` or `-m` flag can set the max depth generate to the tree.  
Default: `Infinity`
```bash
dtree --maxDepth <number>
```

```md
# Set a max depth to 1
PS D:\github-repo\dtree> dtree -m 1
📂 .
├── deno.json
├── deno.lock
├── README.md
└── 📂 src

Success to copy to your clipboard.
```

---

### `--noIcon`

The `--noIcon` flag can the tree display without the icon `📂`.  

```bash
dtree --noIcon
```

```md
PS D:\github-repo\dtree> dtree --noIcon
.
├── deno.json
├── deno.lock
├── README.md
└─┬ src
  ├── archy.ts
  ├── dir-tree-creator.ts
  ├── help.ts
  ├── index.ts
  └─┬ interface
    └── interface.ts

Success to copy to your clipboard.
```

---

### `--icon`

The `--icon` flag can the tree display icon to your icons.  

```bash
dtree --icon <string>
```

```md
PS D:\github-repo\dtree> dtree --icon 📦
📦 .
├── deno.json
├── deno.lock
├── README.md
└─┬ 📦 src
  ├── archy.ts
  ├── dir-tree-creator.ts
  ├── help.ts
  ├── index.ts
  └─┬ 📦 interface
    └── interface.ts

Success to copy to your clipboard.
```

## Notices
1. The script will default to ignore all `__pycache__` and `node_modules` related files. Unless you are using the command inside either one of the folder.
