import type { Stats } from "node:fs";

export interface Nodes {
    label: string
    nodes: Nodes[]
}

export interface KlawSyncObject {
    path: string
    stats: Stats
}

