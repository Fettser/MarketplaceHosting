import { ChangeEvent, createContext, forwardRef, ReactNode, useContext, useImperativeHandle, useState } from 'react'

type RadioContextValue = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string | number
}

const RadioGroupContext = createContext<RadioContextValue>({})

export const useRadioStore = () => useContext(RadioGroupContext)

export interface RadioGroupProps {
  children?: ReactNode,
  name?: string,
  defaultValue?: string | number
}

export interface RadioGroupRef {
  value?: string | number
  name?: string
  checkValidity: () => boolean
}

const RadioGroup = forwardRef<RadioGroupRef, RadioGroupProps>(function RadioGroup({children, name, defaultValue}, ref) {

  const [value, setValue] = useState<string | number | undefined>(defaultValue)

  useImperativeHandle(ref, () => ({
    value: value,
    name: name,
    checkValidity: () => value !== undefined
  }), [value, name])

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <RadioGroupContext.Provider value={{value, onChange: changeHandle}}>
      {children}
    </RadioGroupContext.Provider>
  )
})

export default RadioGroup