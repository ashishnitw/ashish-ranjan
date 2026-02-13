---
title: React Hooks: A Complete Guide
excerpt: Understanding React hooks and how to use them to build powerful functional components.
date: Jan 12, 2026
readTime: 10 min
slug: react-hooks-guide
---

# React Hooks: A Complete Guide

Understanding React hooks and how to use them to build powerful functional components.

## What are React Hooks?

React Hooks are functions that let you "hook into" React features in functional components. They were introduced in React 16.8 and revolutionized how we write React components.

## Why Hooks?

Before hooks, you had to use class components to access features like state and lifecycle methods. Hooks bring these features to functional components:

- **Simpler code**: No need for complex class syntax
- **Code reuse**: Share logic between components
- **Easier testing**: Functional components are easier to test
- **Better performance**: Hooks are optimized by React

## useState: Managing Component State

The `useState` hook lets you add state to functional components.

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## useEffect: Side Effects

The `useEffect` hook lets you perform side effects in functional components.

```javascript
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts or userId changes
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, [userId]); // Dependency array

  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

### Cleanup Functions

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  // Cleanup function
  return () => clearInterval(timer);
}, []);
```

## useContext: Sharing State

Share state across components without prop drilling.

```javascript
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MainContent />
    </ThemeContext.Provider>
  );
}

function MainContent() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

## useReducer: Complex State Logic

For more complex state management, use `useReducer`.

```javascript
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
```

## Other Useful Hooks

### useRef
Access DOM elements or keep a mutable value.

```javascript
const inputRef = useRef(null);

function focusInput() {
  inputRef.current.focus();
}

return <input ref={inputRef} />;
```

### useMemo and useCallback
Optimize performance by memoizing values and callbacks.

```javascript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## Best Practices

1. **Only call hooks at the top level** - Not inside conditions or loops
2. **Call hooks from React function components** - Not from regular functions
3. **Use the ESLint plugin** - Catch mistakes early
4. **Don't forget dependency arrays** - Essential for `useEffect` and other hooks
5. **Create custom hooks** - Extract logic into reusable hooks

## Creating Custom Hooks

```javascript
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

// Usage
function MyComponent() {
  const width = useWindowWidth();
  return <p>Window width: {width}px</p>;
}
```

## Conclusion

React Hooks are powerful tools that make functional components just as capable as class components. Master these hooks and you'll be able to build sophisticated React applications with cleaner, more maintainable code.
