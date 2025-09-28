
export interface Action<T, OPTIONS> {
    generate(options: OPTIONS): Promise<T>;
    generateMany?(count: number): Promise<T[]>;
    generateMedia?(options: OPTIONS): Promise<void | Buffer | string>;
    generateMediaAndJson?(options: OPTIONS): Promise<T>;
}