import { useDispatch, useSelector } from 'react-redux'
import AddCharacterModal from '../modals/AddCharacterModal'
import { showAddCharModal } from '../modals/modalsSlice'

import { deleteOneCharacter } from '../characters/charactersSlice'
import {
  changeSearchInput,
  changeFirstPrice,
  changeSecondPrice,
  changeMedicine,
  changeAgressive,
  resetFilters,
} from './filtersSlice'
import * as charactersSelector from '../characters/charactersSelector'
import * as filtersSelector from './filtersSelector'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import './toolbar.scss'

const Toolbar = () => {
  const dispatch = useDispatch()
  const characterActive = useSelector(charactersSelector.characterActive)
  const searchInput = useSelector(filtersSelector.searchInput)
  const firstPrice = useSelector(filtersSelector.firstPrice)
  const secondPrice = useSelector(filtersSelector.secondPrice)
  const medicine = useSelector(filtersSelector.medicine)
  const agressive = useSelector(filtersSelector.agressive)

  const deleteBtn = (
    <Button
      className="mt-2 ms-2"
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
      <div className="toolbar__wrapper mt-5 mb-3">
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Найдите кошку своей мечты</Form.Label>
          <Form.Control
            value={searchInput}
            type="text"
            placeholder="Поиск породы"
            name={'find'}
            onChange={(e) => dispatch(changeSearchInput(e.target.value))}
          />
        </Form.Group>

        <div className="toolbar__prices ms-5 ">
          <Form.Label>Стоимость (в долларах)</Form.Label>
          <div className="prices">
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Control
                type="number"
                name={'first_price'}
                value={firstPrice}
                placeholder="от ... $"
                onChange={(e) => dispatch(changeFirstPrice(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput3">
              <Form.Control
                className="ms-2"
                type="number"
                name={'second_price'}
                value={secondPrice}
                placeholder="до ... $"
                onChange={(e) => dispatch(changeSecondPrice(e.target.value))}
              />
            </Form.Group>
          </div>
        </div>
        <OverlayTrigger
          key={'medicine'}
          placement={'top'}
          overlay={<Tooltip id={`tooltip-top`}>Очистить фильтры</Tooltip>}
        >
          <svg
            onClick={() => {
              dispatch(resetFilters())
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </OverlayTrigger>
        <div className="mt-4">
          <Form.Check
            type={'checkbox'}
            id={`medicine`}
            checked={medicine}
            label="Этой породе нужна особая медицинаская забота"
            onChange={(e) => dispatch(changeMedicine(e.target.checked))}
          />
          <Form.Check
            label="Эта порода агрессивна"
            id={`agressive`}
            checked={agressive}
            type={'checkbox'}
            onChange={(e) => {
              // console.log(e.target.checked)
              dispatch(changeAgressive(e.target.checked))
            }}
          />
        </div>
      </div>

      <Button
        className="mt-2"
        variant="primary"
        onClick={() => {
          dispatch(showAddCharModal())
        }}
      >
        Добавить породу
      </Button>
      {characterActive ? deleteBtn : null}
      <AddCharacterModal />
    </>
  )
}

export default Toolbar
