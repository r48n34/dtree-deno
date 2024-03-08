import * as clippy from 'https://deno.land/x/clippy@v0.2.2/mod.ts';
import { parseFlags } from 'https://deno.land/x/cliffy@v0.25.7/flags/mod.ts';
import { loading, clearLoading } from "https://deno.land/x/loading_spinnerv2@1.0.1/mod.ts";

async function main() {
	const { flags } = parseFlags(Deno.args, {
		flags: [
			{
				name: 'showsHiddenFolder',
				aliases: ['h', 'hidden'],
				standalone: false,
				type: 'boolean',
			},
			{
				name: 'noCopy',
				aliases: ['n', 'noCopy'],
				standalone: false,
				type: 'boolean',
			},
			{
				name: 'noIcon',
				aliases: ['noIcon'],
				standalone: false,
				type: 'boolean',
			},
			{
				name: 'maxDepth',
				aliases: ['m', 'maxDepth'],
				standalone: false,
				default: Infinity,
				type: 'integer',
			},
			{
				name: 'icon',
				aliases: ['icon'],
				standalone: false,
				default: "📂",
				type: 'string',
			},
			{
				name: 'help',
				aliases: ['help'],
				standalone: true,
				type: 'boolean',
			},
		],
	});

	if (flags.help) {
		const helpLog = await import('./help.ts');
		helpLog.helpLog();
		return;
	}

	const showsHiddenFolder: boolean = 'showsHiddenFolder' in flags ? flags.showsHiddenFolder : false;
	const noCopy: boolean = 'noCopy' in flags ? flags.noCopy : false;
	const noIcon: boolean = 'noIcon' in flags ? flags.noIcon : false;
	const icon: string = flags.icon;
	const maxDepth: number = flags.maxDepth;

	const loadingId = loading("Reading directory... \n\n");
	const dirTree = await import('./dir-tree-creator.ts');

	const tree = await dirTree.dirTree(Deno.cwd(), {
		label: '.',
		showsHiddenFolder,
		maxDepth,
		noIcon,
        icon
	});

	console.log(tree);

	if (!noCopy) {
		await clippy.write_text(tree);
		console.log('\nSuccess to copy to your clipboard.');
	}

	clearLoading(loadingId, "");
}

if (import.meta.main) {
	main();
}
