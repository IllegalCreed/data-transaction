/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_BACK_TYPE: string
  readonly VITE_SHOW_ERROR: string
  readonly VITE_JAVA_SERVER_URL: string
  readonly VITE_NEST_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
