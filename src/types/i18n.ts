type ParamsObject<T = unknown> = Record<string, T>;

export type TFunction = <Key extends string, Value = unknown>(key: Key, options: ParamsObject<Value>) => string;