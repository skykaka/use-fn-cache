# useFnCache

Cache function in the JSX code. Reduce the unless rerender.

Wrap the function that is the property of component to put it into the cache. The function will be same in multiple rerender, and the unless rerender will be reduced.

The function will be in the JSX code, so you can have the type hint、fluent view and so on.

## Install

```bash
npm install --save use-fn-cache
```

## Usage

```tsx
function CacheWithoutDependent() {
  const fn = useFnCache();

  return <Message render={fn('render', () => 'Using cache with no dependent. Never rerender!')}/>;
}

function CacheWithDependent(props: {value: number}) {
  const fn = useFnCache();

  return <Message render={fn('render', () => 'Using cache with value1 as dependent. Rerender when value1 is changed!', [props.value])}/>;
}
```
## License

[MIT](LICENSE)