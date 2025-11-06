# 📂 dtree-deno

<a href="https://deno.land/x/deno_tree"> <img src="https://img.shields.io/badge/deno.land/x/deno_tree-success?logo=deno&logoColor=black&labelColor=white&color=black" /> </a>
<a href="https://github.com/r48n34/dtree-deno"><img src="https://img.shields.io/github/actions/workflow/status/r48n34/dtree-deno/test.yml" /></a>

A simple CLI for generate the dir tree with deno.

- ✅ Windows
- ✅ MacOS

## 🚀 Install 
1. Using the following commands.
```bash
deno install -A --global -f -n dtree jsr:@reemo/dtree-deno
```

2. Done, try the following command in terminal.
```bash
dtree
```

## 🐙 Install from git
This methos is for non-denoLand install. If you are using the top method to install, you can skip this sections. 

1. Git clone the project first
```bash
git clone https://github.com/r48n34/dtree-deno.git
```

2. Install with deno task
```bash
deno task install
```

3. Run with dtree
```bash
dtree
```

## 💻 CLI Result
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
  └── mod.ts

Success to copy to your clipboard.
```

## 🔧 Config (All are Optional flags)

| Name                      | Params             | Type    | Description                                     | 
| ------------------------- | ------------------ | ------- | ----------------------------------------------- | 
| Shows Hidden folder       | `--hidden`, `-h`   | boolean | Will include the '.' folder output this result. | 
| No auto copy result       | `--noCopy`, `-n`   | boolean | Will not auto copy the result.                  | 
| Set max depth tree        | `--maxDepth`, `-m` | number  | Set the max depth generate to the tree          |   
| Set No Icon display       | `--noIcon`         | boolean | Set the tree display without the icon `📂`      |       
| Set Icon display          | `--icon`           | string  | Set the tree display icon (Default: `📂`)       |        

## 🔍 More demo usgae

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
  └── mod.ts

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
  └── mod.ts
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
  ├── mod.ts
  └─┬ interface
    └── interface.ts

Success to copy to your clipboard.
```

---

### `--icon`

The `--icon` flag can the tree display icon to your icons.  
Default: `📂`

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
  ├── mod.ts
  └─┬ 📦 interface
    └── interface.ts

Success to copy to your clipboard.
```

## 💻 Non-CLI Usage
All ops are as the same with CLI.

```ts
import { dirTree } from "jsr:@reemo/dtree-deno@0";

(async () => {
    const trereStr: string = await dirTree(
        Deno.cwd(), // Target folder path
        {
          label: ".",
          showsHiddenFolder: false,
          maxDepth: 1,
          noIcon: false,
          icon: "📂",
        },
    );
})()
```

## 🔍 Notices
1. The script will default to ignore all `__pycache__` and `node_modules` related files. Unless you are using the command inside either one of the folder.

## ➖ Uninstall 
```bash
deno uninstall dtree 
```

## 🔐 License
MIT License
