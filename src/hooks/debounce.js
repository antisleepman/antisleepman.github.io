import {useMemo} from "react";
import useLatest from "use-latest";
import { debounce } from "lodash-es";


export default function useDebounce(cb, ms) {
  const latestCb = useLatest(cb);
  return useMemo(
    () =>
      debounce((...args) => {
        latestCb.current(...args);
      }, ms),
    [ms, latestCb]
  );
}
