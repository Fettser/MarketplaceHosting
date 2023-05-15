import { createContext, Dispatch, SetStateAction } from 'react'

export type DropdownContextValue = {
  show?: boolean
  setShow?: Dispatch<SetStateAction<boolean>>
}

const DropdownContext = createContext<DropdownContextValue>({})

export default DropdownContext
