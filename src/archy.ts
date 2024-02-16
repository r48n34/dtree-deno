// references https://www.npmjs.com/package/archy
import { Nodes } from './interface/interface.ts';

// const chars = {
// 	'│': '|',
// 	'└': '`',
// 	'├': '+',
// 	'─': '-',
// 	'┬': '-',
// };

export function archy(
	obj: Nodes,
	pre?: string,
    options?:{ icon:string, noIcon: boolean }
): string {
	const prefix = pre ? pre : '';

	if (typeof obj === 'string') {
		obj = { label: obj, nodes: [], isDirectory: true } as Nodes;
	}

	const nodes = obj.nodes || [];
	const splitter = '\n' + prefix + (nodes.length ? '│' : ' ') + ' ';
	const lines = (obj.label || '').split('\n');

    const icon: string = options!.noIcon ? "" : options!.icon + " ";
	lines[0] = obj.isDirectory ? (icon + lines[0]) : lines[0];

	return prefix +
		lines.join(splitter) + '\n' +
		nodes.map(function (node: Nodes, ix: number) {
			const last = ix === nodes.length - 1;
			const more = node.nodes && node.nodes.length;
			const prefix_ = prefix + (last ? ' ' : '│') + ' ';

			return prefix +
				(last ? '└' : '├') + '─' +
				(more ? '┬' : '─') + ' ' +
				archy(node, prefix_, options).slice(prefix.length + 2);
		}).join('');
}
