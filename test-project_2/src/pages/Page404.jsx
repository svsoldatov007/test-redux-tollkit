import { Link } from 'react-router-dom'
import routes from '../routes'
const Page404 = () => {
  return (
    <>
      <div className="container">
        <p className="h5-text mt-5">Страница не была найдена. Ошибка 404</p>
        <p className="ext">
          Перейдите на{' '}
          <Link className="text" to={routes.main}>
            главную страницу
          </Link>
        </p>
      </div>
    </>
  )
}

export default Page404
