import {
  ComponentProps,
  ElementType,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
} from 'react'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

export type ButtonOwnProps<E extends ElementType = ElementType> = {
  as?: E
  children?: ReactNode
  variant?: 'outlined' | 'contained' | 'error' | 'transparent' | 'default'
  animation?: 'color' | 'scale'
  size?: 'small' | 'medium' | 'large'
  className?: Array<string> | string
}

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
  Omit<ComponentProps<E>, keyof ButtonOwnProps>

/**
 * Полиформный конпонент кнопки
 * param as - тип компонента
 * param variant - стиль кнопки
 * param animation - анимации при взаимодействии
 * param size - размер
 * param className - класс(ы) для добавления дополнительных стилей
 */

const Button: <E extends ElementType = 'button'>(
  props: ButtonProps<E>,
) => ReactElement | null = forwardRef(function Button(
  {
    as,
    children,
    className,
    variant = 'transparent',
    animation,
    size,
    ...rest
  }: ButtonOwnProps,
  ref: Ref<Element>,
) {
  const Element = as || 'button'

  const classes = cx({
    base: true,
    [styles[animation ? animation : '']]: !!animation,
    [styles[variant ? variant : '']]: !!variant,
    [styles[size ? size : 'small']]: true,
  })

  return (
    <Element
      className={[classes, className].join(' ')}
      ref={ref}
      {...rest}
      as={undefined}
    >
      {children}
    </Element>
  )
})

export default Button
