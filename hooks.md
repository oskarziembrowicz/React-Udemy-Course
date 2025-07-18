# React Hooks

### useState

Adds a state variable to a component and a method to modify it.

When state variable is modified, the component is re-rendered.

```js
const [state, setState] = useState(initialState);
```

### useEffect

Synchronizes a component with an external system.
Runs a setup function every time a dependency is changed. If no dependacies specified it will run on each re-render. If you pass empty dependencies ([]), the effect will run only on init.

```js
seEffect(() => {
  const connection = createConnection(serverUrl, roomId);
  connection.connect();
  return () => {
    connection.disconnect();
  };
}, [serverUrl, roomId]);
```

If your setup function returns a function it will be treated as a cleanup function.

Cleanup funcions are run before the setup and after component is unmounted.

### useLayoutEffect

Type of useEffect, that runs before the browser repaints the screen. It is used to calculate some initial values after the JSX has been added to the DOM, but before the view is repainted fo the user (for example to decide if a tooltip will fit above or below)

```js
useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setTooltipHeight(height); // Re-render now that you know the real height
}, []);
```

### useRef

For referencing a value that is not needed for rendering. This returns a _ref_ with a _current_ property that is initially set to _initialValue_.

To change _ref_ value you need to manually change its _current_ property value. This will stay persistent even after component re-render (like **state**) but **will not trigger a re-render** (unlike **state**).

```js
const ref = useRef(initialValue);
ref.current = someNewValue;
```

### useReducer

### useMemo

### useCallback

### useContext
