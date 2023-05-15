import { FC, ReactElement } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface IProps {
  children: ReactElement
}

/**
 * Layout-компонент
 * param {ReactElement} children - отображаемые внутри страницы
 */

const Layout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{flex: '1 1 auto'}}>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
