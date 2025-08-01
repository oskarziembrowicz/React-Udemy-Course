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

Lets you add a **reducer** to a component.

#### Reducer

When you perform many different actions on your state variable, for examplce creating an item, changing an item and deleting an item, it's best to store handling definitions in one designated place - **reducer function**.

When an action should take place, do only:

```js
dispatch({
  type: "added",
  id: nextId++,
  text: text,
});
```

This thispatches an **action** to the **reducer**

Then outside the component (maybe in a different file) define a reducer. It takes a **state**, an **action** and returns **modified state**.

```js
export default function someReducer(state, action) {
  switch (action.type) {
    case "added": {
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return state.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return state.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
```

Now instead of using **useState** you use **useReducer** to define the reducer and state:

```js
const [state, dispatch] = useReducer(reducerFunction, initialStateValue);
```

Where **state** and **initialStateValue** define new state variable and **reducerFunction** is the reducer.

### useMemo

Allows for caching some values between renders.

```js
const cachedValue = useMemo(calculateValue, dependencies);
```

**calculateValue** is a pure function, with no arguments and an **any** return type. The result of the function will be stored for later in **cachedValue**. The function will be called on initial render. Then on next renders it will return the same value, unless **dependencies** change values, then it calls **calculateValue** again.

**dependencies** is a list of values referenced inside of **calculateValue**.

Example:

```js
function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

### useCallback

Allows for caching function definitions between re-renders. Works just as useMemo, but for **function definitions**.

```js
const cachedFn = useCallback(fn, dependencies);
```

**fn** is a function taking any arguments and returning any values. Its definition will be cached on initial render and on any render where **dependencies** change.

It is useful, for example when you have a component that only re-renders, when its props change, and one of this props is a function passed from a parent. If the function in the parent is defined using `function () {}` or `() => {}` it will always be created as a new one - meaning, that the prop will always be different, triggering a re-render each time. If you use **useCallback** to define the function it will make this solution work.

```js
function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback(
    (orderDetails) => {
      post("/product/" + productId + "/buy", {
        referrer,
        orderDetails,
      });
    },
    [productId, referrer]
  );
  // ...
  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

### useContext

Allows for recieving **context**.

#### Context

Its a piece of information passed down to all child components.

The context is defined in a separate file:

```js
export const LevelContext = createContext(1);
```

The context is created with a default value of "1".

Now when a component wants to recieve the context, it needs to import it and use a hook:

```js
const level = useContext(LevelContext);
```

It will recieve the context with default value of "1".
To change it, a parent component needs to provide the context:

```js
return (
  <section className="section">
    <LevelContext value={level + 1}>{children}</LevelContext>
  </section>
);
```

Now each child component in the LevelContext will be able to recieve the context.
