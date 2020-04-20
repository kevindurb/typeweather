import * as React from 'react';
import * as qs from 'querystring';
import * as humps from 'humps';

const fetchJSON = <T extends object>(url: string, params?: qs.ParsedUrlQuery) => {
  const query = params ? `?${qs.stringify(params)}` : '';
  return fetch(`${url}${query}`)
  .then(response => response.json())
  .then(data => humps.camelizeKeys(data) as T)
};

export const useGet = <T extends object>(url: string, params?: qs.ParsedUrlQuery): [T | undefined, () => void] => {
  const [data, setData] = React.useState<T>();

  const execute = React.useCallback(() => {
    fetchJSON<T>(url, params)
    .then((data) => setData(data));
  }, [url, params, setData]);

  return [
    data,
    execute,
  ];
};
