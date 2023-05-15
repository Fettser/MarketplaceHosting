import { GetStaticPaths, GetStaticProps } from 'next'
import styles from './Catalog.module.scss'
import Carousel from '../../components/Carousel/Carousel'
import InfoCard from '../../components/Card/InfoCard'
import PreviewCard from '../../components/Card/PreviewCard'
import Button from '../../UI/Button/Button'
import ReviewList from '../../components/Card/ReviewList'
import Tabs from '../../components/Tabs/Tabs'

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch('https://rickandmortyapi.com/api/character').then(
    (res) => res.json(),
  )
  const paths = Array.from(
    { length: Number(data?.info?.count) },
    (_, i) => i + 1,
  ).map((item) => {
    return { params: { id: `${item}` } }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetch(
    `https://rickandmortyapi.com/api/character/${context?.params?.id}`,
  ).then((res) => res.json())
  return {
    props: {
      id: data?.id,
      name: data?.name,
      status: data?.status,
      image: data?.image,
    },
  }
}

export type CategoryProps = {
  id: number
  name: string
  status: string
  image: string
}

export default function Id({ id, status, image, name }: CategoryProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Stylized in Cliffs</h1>
        <div className={styles.categories}>
          <div className={styles.category}>Audio</div>
          <div className={styles.category}>2D</div>
          <div className={styles.category}>3D</div>
          <div className={styles.category}>VFX</div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.gallery}>
          <Carousel />
        </div>
        <div className={styles.card}>
          <InfoCard />
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.details}>
          <Tabs options={[
            {
              label: 'Описание',
              component: <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab adipisci aperiam dolores
                ducimus eius eos esse est illum incidunt ipsa itaque iure iusto magni necessitatibus nemo nulla
                obcaecati pariatur placeat quae, quas quidem repellendus reprehenderit temporibus unde vel vero. Beatae
                ea expedita fugiat hic in molestias perferendis repudiandae veniam!</p>,
            },
            {
              label: 'Отзывы',
              component: <ReviewList />,
            },
            {
              label: 'Технические детали',
              component: <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aut cupiditate distinctio
                doloremque esse hic inventore ipsam maiores molestiae molestias!</p>,
            },
          ]} wrapped={true}/>
        </div>
        <div className={styles.similar_wrapper}>
          <div className={styles.actions}>
            <h3>Похожие</h3>
            <Button variant='outlined'>Показать еще</Button>
          </div>
          <div className={styles.similar}>
            <PreviewCard
              id={1}
              species={'DEKOGON STUDIOS'}
              name={'Stylized Cliffs'}
              category={'2D'}
              price={1990}
              image={
                'https://rickandmortyapi.com/api/character/avatar/361.jpeg'
              }
              minify={true}
            />
            <PreviewCard
              id={2}
              species={'DEKOGON STUDIOS'}
              name={'Stylized Cliffs'}
              category={'2D'}
              price={1990}
              image={
                'https://rickandmortyapi.com/api/character/avatar/361.jpeg'
              }
              minify={true}
            />
            <PreviewCard
              id={3}
              species={'DEKOGON STUDIOS'}
              name={'Stylized Cliffs'}
              category={'2D'}
              price={1990}
              image={
                'https://rickandmortyapi.com/api/character/avatar/361.jpeg'
              }
              minify={true}
            />
            <PreviewCard
              id={4}
              species={'DEKOGON STUDIOS'}
              name={'Stylized Cliffs'}
              category={'2D'}
              price={1990}
              image={
                'https://rickandmortyapi.com/api/character/avatar/361.jpeg'
              }
              minify={true}
            />
            <PreviewCard
              id={5}
              species={'DEKOGON STUDIOS'}
              name={'Stylized Cliffs'}
              category={'2D'}
              price={1990}
              image={
                'https://rickandmortyapi.com/api/character/avatar/361.jpeg'
              }
              minify={true}
            />
            <PreviewCard
              id={6}
              species={'DEKOGON STUDIOS'}
              name={'Stylized Cliffs'}
              category={'2D'}
              price={1990}
              image={
                'https://rickandmortyapi.com/api/character/avatar/361.jpeg'
              }
              minify={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
