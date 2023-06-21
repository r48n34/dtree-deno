export function archy(obj:{ nodes: any[], label: string }, pre?: string, opt?: { unicode?: boolean }): any {

    let prefix = !!pre ? pre : ''
    let opts = !opt ? {} : opt

    const chr = function (s: string) {
        const chars = {
            '│' : '|',
            '└' : '`',
            '├' : '+',
            '─' : '-',
            '┬' : '-'
        } as any;

        return opts.unicode === false ? chars[s] : s;
    };
    
    if (typeof obj === 'string') {
        obj = { label : obj } as any
    }
    
    let nodes = obj.nodes || [];
    let lines = (obj.label || '').split('\n');
    let splitter = '\n' + prefix + (nodes.length ? chr('│') : ' ') + ' ';
    
    return prefix
        + lines.join(splitter) + '\n'
        + nodes.map(function (node: any, ix: any) {
            let last = ix === nodes.length - 1;
            let more = node.nodes && node.nodes.length;
            let prefix_ = prefix + (last ? ' ' : chr('│')) + ' ';
            
            return prefix
                + (last ? chr('└') : chr('├')) + chr('─')
                + (more ? chr('┬') : chr('─')) + ' '
                + archy(node, prefix_).slice(prefix.length + 2)
            ;
        }).join('')

}