/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FORM_ENDPOINT: string;
    readonly VITE_FORM_ACCESS_KEY: string;
    readonly VITE_MOCK_FORM?: "success" | "error" | "throw";
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
