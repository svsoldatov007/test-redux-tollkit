import { Link, Outlet } from 'react-router-dom'
import CustomLink from '../components/customLink/CustomLink'
import routes from '../routes'
const Layout = () => {
  return (
    <>
      <header className="container">
        <div
          style={{ width: '200px' }}
          className="d-flex justify-content-between align-items-center mt-3"
        >
          <CustomLink to={routes.main}>Главная</CustomLink>

          <CustomLink to={routes.main + routes.info}>Информация</CustomLink>
        </div>
      </header>
      <Outlet />
      <footer className="container mt-5">it is footer</footer>
    </>
  )
}

export default Layout
