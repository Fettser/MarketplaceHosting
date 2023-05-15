import ReviewList from '../../components/Card/ReviewList'
import Tabs from '../../components/Tabs/Tabs'
import styles from './Seller.module.scss'
import ProfileCard from '../../components/Seller/Card/ProfileCard'
import Textarea from '../../UI/Input/Textarea'
import AssetForm from '../../components/Seller/Asset/AssetForm'

const nameFields = [
  {id: 1, name: 'Имя', value: 'Берлога с ассетами'},
]

const emailField = [
  {id: 2, name: 'Почта для связи', value: 'bear-asset@gmail.com'},
]

const Profile = () => {

  return (
    <div className={styles.container}>
      <Tabs options={[
        {
          label: 'Профиль',
          component:
          <div className={styles.profile}>
            <ProfileCard fields={nameFields} image={'/bearAvatar.png'}/>
            <ProfileCard fields={emailField}/>
          </div>
        },
        {
          label: 'Добавить ассет',
          component: <AssetForm/>,
        },
        {
          label: 'Технические детали',
          component: <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aut cupiditate distinctio
            doloremque esse hic inventore ipsam maiores molestiae molestias!</p>,
        },
      ]}/>
    </div>
  )
}

export default Profile