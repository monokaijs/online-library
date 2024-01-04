import {useState} from 'react';

type Caller = (...args: any) => any;

type CallerMeta = { data: any; error: any; loading: boolean };

type HookReturnType = [caller: Caller, meta: CallerMeta];

const useApiRequest = (fn: (...args: any) => Promise<any>): HookReturnType => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const caller = async (...args: any): Promise<any> => {
    // reset status to initial state
    setError(null);
    setLoading(true);
    try {
      const data = await fn(...args);
      setData(() => data);
      setLoading(() => false);
      return data;
    } catch (e: any) {
      setLoading(() => false);
      setError(() => e);
      throw e;
    }
  };

  return [caller, {data, error, loading}] as HookReturnType;
};

export default useApiRequest;
