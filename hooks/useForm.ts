import { ChangeEvent, FormEvent, useRef, useState, RefObject, useEffect, MutableRefObject } from 'react'

type InputMap = {
  [k: string]: any
}

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement


export const useForm = ( onSubmit: (data: InputMap) => any) => {

  const fieldRefs = useRef<Map<string, MutableRefObject<Field | null>>>(new Map())

  const register = (name: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef(null)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      fieldRefs.current.set(name, ref)

      return () => {
        fieldRefs.current.delete(name)
      }
    }, [ref, name])

    return {ref, name}
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data: InputMap = {}
    const error = false
    fieldRefs.current.forEach((field: MutableRefObject<Field | null>) => {
      if (!field.current?.checkValidity() || field.current?.hidden) {
        return {message: 'error'}
      } else {
        data[field.current?.name] = field.current?.value
      }
    })
    onSubmit?.(data)
  }

  return { handleSubmit, register }
}