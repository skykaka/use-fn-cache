import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {useFnCache} from '../dist';

const App = () => {
  const fn = useFnCache();
  const [value1, setValue1] = React.useState(0);
  const [value2, setValue2] = React.useState(0);

  return <div style={{textAlign: 'center'}}>
    <button onClick={() => setValue1(x => (x + 1) % 5)}>
      change value1
    </button>
    <button onClick={() => setValue2(x => (x + 1) % 5)} style={{marginLeft: 16}}>
      change value2
    </button>
    <div>
      <p>value1 = {value1}</p>
      <p>value2 = {value2}</p>
    </div>

    <hr/>
    <CacheWithoutDependent/>

    <hr/>
    <CacheWithDependent value={value1}/>

    <hr/>
    <WithoutCache/>
  </div>
};

function WithoutCache() {
  return <Message render={() => 'Without cache. Rerender every time!'}/>
}

function CacheWithoutDependent() {
  const fn = useFnCache();

  return <Message render={fn('render', () => 'Using cache with no dependent. Never rerender!')}/>
}

function CacheWithDependent(props: {value: number}) {
  const fn = useFnCache();

  return <Message render={fn('render', () => 'Using cache with value1 as dependent. Rerender when value1 is changed!', [props.value])}/>
}

const Message = React.memo((props: {render: () => React.ReactNode}) => {

  const countRef = React.useRef(0);
  countRef.current++;

  return <p>
    <div>
        <p style={{margin: 16}}>
          {props.render()}
        </p>
    </div>
    <div>render count: {countRef.current}</div>
  </p>

}, (p1, p2) => p1.render === p2.render);

ReactDOM.render(<App />, document.getElementById('root'));
