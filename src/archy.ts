// references https://www.npmjs.com/package/archy
import { Nodes } from "./interface/interface.ts";

const chars = {
    '│' : '|',
    '└' : '`',
    '├' : '+',
    '─' : '-',
    '┬' : '-'
};

export function archy(obj: Nodes, pre?: string, opt?: { unicode?: boolean }): string {

    const prefix = pre ? pre : ''
    const opts = !opt ? {} : opt

    const chr = function (s: keyof typeof chars) {
        return opts.unicode === false ? chars[s] : s;
    };
    
    if (typeof obj === 'string') {
        obj = { label : obj, nodes: [], isDirectory: true } as Nodes
    }
    
    const nodes = obj.nodes || [];
    const splitter = '\n' + prefix + (nodes.length ? chr('│') : ' ') + ' ';
    const lines = (obj.label || '').split('\n');

    lines[0] = obj.isDirectory ? "📂 " + lines[0] : lines[0]
    
    return prefix
        + lines.join(splitter) + '\n'
        + nodes.map(function (node: Nodes, ix: number) {
            const last = ix === nodes.length - 1;
            const more = node.nodes && node.nodes.length;
            const prefix_ = prefix + (last ? ' ' : chr('│')) + ' ';
            
            return prefix
                + (last ? chr('└') : chr('├')) + chr('─')
                + (more ? chr('┬') : chr('─')) + ' '
                // + obj.isDirectory ? "📂 " : ""
                + archy(node, prefix_).slice(prefix.length + 2)
            ;
        }).join('')

}