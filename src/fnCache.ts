import equal from "array-equal";

export function createFnCache(): FnCache {
    const map:CacheMap = {};

    return (key: string, fun: any, deps: any[] = []) => {
        const old = map[key];
        if(old !== undefined && equal(old.deps, deps)) {
            return old.fun;
        }

        map[key] = {fun, deps};
        return fun;
    };
}

type FnCache = <Args extends any[], Return>
    (key: string, fun: (...args: Args) => Return, deps?: any[]) => ((...args: Args) => Return);

type CacheMap = {
    [key in string | number] : CacheItem<any>
}

type CacheItem<T> = {
    deps: any[];
    fun: T;
}