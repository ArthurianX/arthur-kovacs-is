import { initThinBackend } from 'thin-backend';

export const thinBackendHost = process.env.NEXT_PUBLIC_BACKEND_URL;

let isThinBackendInitialized = false;

export function initializeThinBackend() {
    if (!thinBackendHost || isThinBackendInitialized) {
        return;
    }

    initThinBackend({ host: thinBackendHost });
    isThinBackendInitialized = true;
}
