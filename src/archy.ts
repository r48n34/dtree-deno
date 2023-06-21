const chars = {
    '│' : '|',
    '└' : '`',
    '├' : '+',
    '─' : '-',
    '┬' : '-'
};

export function archy(obj:{ nodes: any[], label: string }, pre?: string, opt?: { unicode?: boolean }): string {

    const prefix = pre ? pre : ''
    const opts = !opt ? {} : opt

    const chr = function (s: keyof typeof chars) {
        return opts.unicode === false ? chars[s] : s;
    };
    
    if (typeof obj === 'string') {
        obj = { label : obj } as any
    }
    
    const nodes = obj.nodes || [];
    const lines = (obj.label || '').split('\n');
    const splitter = '\n' + prefix + (nodes.length ? chr('│') : ' ') + ' ';
    
    return prefix
        + lines.join(splitter) + '\n'
        + nodes.map(function (node: any, ix: number) {
            const last = ix === nodes.length - 1;
            const more = node.nodes && node.nodes.length;
            const prefix_ = prefix + (last ? ' ' : chr('│')) + ' ';
            
            return prefix
                + (last ? chr('└') : chr('├')) + chr('─')
                + (more ? chr('┬') : chr('─')) + ' '
                + archy(node, prefix_).slice(prefix.length + 2)
            ;
        }).join('')

}