declare module 'thin-backend' {
    export type ThinBackendRecord = Record<string, any>;

    export interface ThinBackendQuery {
        where(filters: ThinBackendRecord): ThinBackendQuery;
        fetchOne(): Promise<ThinBackendRecord | null>;
    }

    export function initThinBackend(options: { host?: string }): void;
    export function query(collection: string): ThinBackendQuery;
    export function createRecord(
        collection: string,
        record: ThinBackendRecord,
    ): Promise<ThinBackendRecord>;
}
