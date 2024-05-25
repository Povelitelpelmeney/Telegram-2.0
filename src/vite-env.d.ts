/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HTTP_GRAPHQL_ENDPOINT: string;
  readonly VITE_WS_GRAPHQL_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
