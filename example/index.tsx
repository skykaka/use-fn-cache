import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {useFnCache} from '../dist';

const App = () => {
  const fn = useFnCache();
  const [value1, setValue1] = React.useState(0);
  const [value2, setValue2] = React.useState(0);

  return <div>
    <button onClick={() => setValue1(x => (x + 1) % 5)}>
      change value1
    </button>
    <button onClick={() => setValue2(x => (x + 1) % 5)}>
      change value2
    </button>
    <p>
      <div>value1 = {value1}</div>
      <div>value2 = {value2}</div>
    </p>
    <TestComp render={
      fn('render1', () => 'This is a render using fnCache with no dependent. Not change forever!')
    }/>
    <TestComp render={() => 'This is a render using normal function. Change every time!'}/>

    <TestComp render={
      fn('render3', () => `This is a render using fnCache depending on variable value1. Change when the value1 is changed: value1=[${value1}]`, [value1])
    }/>
  </div>
};

const TestComp = React.memo((props: {render: () => string}) => {

  const countRef = React.useRef(0);
  countRef.current++;

  return <p>
    <div>{props.render()}</div>
    <div>render count: {countRef.current}</div>
  </p>

}, (p1, p2) => p1.render === p2.render);

ReactDOM.render(<App />, document.getElementById('root'));
