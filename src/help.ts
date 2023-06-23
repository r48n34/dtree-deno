export function helpLog() {
	console.log('\x1b[34mdtree-deno\x1b[0m');
	console.log('');

	console.log('  Show Hidden Folder   --hidden -h');
	console.log('  No Copy              --noCopy -n');
	console.log('  No Icon              --noIcon   ');
	console.log('  Set Max Depth        --maxDepth <number> -m <number>');
	console.log('');
	console.log('e.g. dtree -h');
}
