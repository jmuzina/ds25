import React, {useEffect, Suspense, useState, lazy} from "react";
import canonicalLogo from "./assets/canonical.svg";
import reactLogo from "./assets/react.svg";
import "./Application.css";
import {Button} from "@canonical/ds-react-core";

function delayForDemo<T>(promise: Promise<T>, timeout: number = 2000) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  }).then(() => {
    console.log("resolving promise", promise);
    return promise;
  });
}

const LazyButton = lazy(() => delayForDemo(import('./LazyComponent.js')));


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a
          href="https://canonical.com"
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noreferrer"
        >
          <img src={canonicalLogo} className="logo" alt="Canonical logo"/>
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Canonical Design System</h1>
      <h2>React Vite template</h2>
      <Suspense fallback={"Loading..."}>
        <LazyButton/>
      </Suspense>
      <div className="card">
        <Button
          label={`Count: ${count}`}
          onClick={() => setCount((count) => count + 1)}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
