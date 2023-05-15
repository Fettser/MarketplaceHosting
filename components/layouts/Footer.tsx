import styles from './Footer.module.scss'
import Youtube from '../../public/youtube.svg'
import VK from '../../public/vk.svg'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

/**
 * Компонент подвала
 */

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <a href="mailto:bear-assets@mail.ru" className={styles.mail}>
            bear-assets@mail.ru
          </a>
          <div className={styles.social}>
            <a
              href="https://vk.com/bear_head_studio"
              target="_blank"
              rel="noreferrer"
            >
              <VK />
            </a>
            <a
              href="https://www.youtube.com/@BearHeadStudio"
              target="_blank"
              rel="noreferrer"
            >
              <Youtube />
            </a>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.subscription}>
          <p>Подписаться на новости</p>
          <div className={styles.input__wrapper}>
            <Input placeholder="Email" />
            <Button as="button" variant="contained">
              Подписаться
            </Button>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.copyright}>
          <div className={styles.logo}>
            <p>
              Маркетплейс
              <br />
              Ассетов
            </p>
          </div>
          <div className={styles.copyright_text}>
            <p>Все права защищены</p>
            <a href="https://bearheadstudio.ru">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
