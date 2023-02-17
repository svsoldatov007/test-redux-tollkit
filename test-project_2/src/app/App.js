import CharactersPage from '../pages/CharactersPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../layouts/Layout'
import InfoPage from '../pages/InfoPage.jsx'
import Page404 from '../pages/Page404'
import routes from '../routes'

import './app.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.main} element={<Layout />}>
            <Route index path={routes.main} element={<CharactersPage />} />
            <Route path={routes.info} element={<InfoPage />} />
            <Route path={'*'} element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <div className="App">
        <CharactersPage />
      </div> */}
    </>
  )
}

export default App
