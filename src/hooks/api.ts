import * as React from 'react';
import * as qs from 'querystring';
import * as humps from 'humps';

const fetchJSON = <T extends object>(
  url: string,
  params?: qs.ParsedUrlQuery,
) => {
  const query = params ? `?${qs.stringify(params)}` : '';
  return fetch(`${url}${query}`)
    .then((response) => response.json())
    .then((data) => humps.camelizeKeys(data) as T);
};

export const useGet = <T extends object>(
  url: string,
  params?: qs.ParsedUrlQuery,
): [T | undefined, (otherParams?: qs.ParsedUrlQuery) => Promise<T>] => {
  const [data, setData] = React.useState<T>();

  const execute = React.useCallback(
    (otherParams?: qs.ParsedUrlQuery): Promise<T> =>
      fetchJSON<T>(url, { ...params, ...otherParams }).then((data) => {
        setData(data);
        return data;
      }),
    [url, params, setData],
  );

  return [data, execute];
};
