import {createFnCache} from '../src/fnCache';

describe('Fn Cache', () => {
    it('should register with the fn if the key is not registered', () => {
        const fn = createFnCache();
        const testFn = () => {};
        const returnFn = fn('test', testFn);
        expect(testFn).toBe(returnFn);
    });

    it('should return the cache fn if the key is registered and the deps is not changed', () => {
        const fn = createFnCache();
        const testFn = () => {};
        fn('test', testFn);

        const returnFn = fn('test', () => {});

        expect(testFn).toBe(returnFn);
    });

    it('should register with new fn if the key is registered but the deps is changed', () => {
        const fn = createFnCache();
        fn('test', () => {}, ['a']);

        const testFn = () => {};
        const returnFn = fn('test', testFn, ['b']);

        expect(testFn).toBe(returnFn);
    });
});