import { dirTree } from "./dir-tree-creator.ts"
import { cliMain } from './cliMain.ts';

export { dirTree }

if (import.meta.main) {
	cliMain();
}
