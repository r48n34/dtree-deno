import { parseFlags } from 'https://jsr.io/@cliffy/flags/1.0.0-rc.8/flags.ts';
import clipboard from 'npm:clipboardy@5.0.0';
import { dirTree } from './dir-tree-creator.ts';

export async function cliMain() {
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

	console.log("Reading directory... \n\n");
	// const dirTree = await import('./dir-tree-creator.ts');

	const tree = await dirTree(Deno.cwd(), {
		label: '.',
		showsHiddenFolder,
		maxDepth,
		noIcon,
        icon
	});

	console.log(tree);

	if (!noCopy) {
		await clipboard.write(tree);
		console.log('\nSuccess to copy to your clipboard.');
	}

}