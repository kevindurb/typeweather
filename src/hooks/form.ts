import * as React from 'react'

export const useInputValue = (defaultValue: string): [string, (event: React.ChangeEvent) => any] => {
  const [value, setValue] = React.useState(defaultValue);

  const setTargetValue = React.useCallback((event: React.ChangeEvent) => {
    setValue(event.target.nodeValue!)
  }, [setValue])

  return [
    value,
    setTargetValue,
  ]
}
