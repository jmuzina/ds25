import { Button } from "@canonical/react-ds-core";

function LazyComponent() {
  return (
    <Button appearance={"positive"} onClick={() => alert("clicked!")}>
      Click me
    </Button>
  );
}

export default LazyComponent;
