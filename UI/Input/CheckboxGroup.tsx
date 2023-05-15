import { ChangeEvent, createContext, FC, forwardRef, ReactNode, useContext, useImperativeHandle, useState } from 'react'

type CheckboxContextValue = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: (string | number)[]
}

const CheckboxGroupContext = createContext<CheckboxContextValue>({})

export const useCheckboxStore = () => useContext(CheckboxGroupContext)

export interface CheckboxGroupProps {
  children?: ReactNode,
  name?: string,
  defaultValue?: (string | number)[]
}

export interface CheckboxGroupRef {
  value?: (string | number)[]
  name?: string
  checkValidity: () => boolean
}

const CheckboxGroup = forwardRef<CheckboxGroupRef, CheckboxGroupProps>(function CheckboxGroup({children, name, defaultValue}, ref) {

  const [value, setValue] = useState<Array<string | number>>(defaultValue || [])

  useImperativeHandle(ref, () => ({
    value: value,
    name: name,
    checkValidity: () => !!value?.length
  }), [value, name])

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValue(prevState => [...prevState, e.target.value])
    } else {
      setValue(prevState => prevState.filter(item => item !== e.target.value))
    }
  }

  return (
    <CheckboxGroupContext.Provider value={{value, onChange: changeHandle}}>
      {children}
    </CheckboxGroupContext.Provider>
  )
})

export default CheckboxGroup