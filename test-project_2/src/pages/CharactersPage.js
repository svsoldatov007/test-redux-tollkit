import { useDispatch, useSelector } from 'react-redux'
import AddCharacterModal from '../components/modals/AddCharacterModal'
import { showAddCharModal } from '../components/modals/modalsSlice'

import { deleteOneCharacter } from '../components/characters/charactersSlice'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Characters from '../components/characters/Characters'

const CharactersPage = () => {
  const dispatch = useDispatch()
  const { characterActive } = useSelector((state) => state.characters)

  const deleteBtn = (
    <Button
      className="mt-5 ms-2"
      variant="danger"
      onClick={() => {
        dispatch(deleteOneCharacter(characterActive.id))
      }}
    >
      Удалить породу
    </Button>
  )

  return (
    <>
      <Container>
        <h2 className="h2-text mt-4">Магазин кошек</h2>
        <Button
          className="mt-5"
          variant="primary"
          onClick={() => {
            dispatch(showAddCharModal())
          }}
        >
          Добавить породу
        </Button>
        {characterActive ? deleteBtn : null}

        <AddCharacterModal />
        <Characters />
      </Container>
    </>
  )
}

export default CharactersPage
