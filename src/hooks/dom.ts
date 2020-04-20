import * as React from 'react';

export const useRefWidth = <T extends HTMLElement>(): [
  React.MutableRefObject<T | null>,
  number,
] => {
  const ref = React.useRef<T>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return [ref, width];
};
