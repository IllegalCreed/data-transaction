export type SubsetRecordOf<T extends object> = {
  [K in keyof T]?: string;
};
