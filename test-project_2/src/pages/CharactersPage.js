import Toolbar from '../components/toolbar/Toolbar'
import Container from 'react-bootstrap/Container'
import Characters from '../components/characters/Characters'

const CharactersPage = () => {
  return (
    <>
      <Container>
        <h2 className="h2-text mt-5">Магазин кошек</h2>
        <Toolbar />

        <Characters />
      </Container>
    </>
  )
}

export default CharactersPage
