/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TMDB_KEY: string;
  // 필요하면 여기에 다른 환경변수도 추가하세요.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
