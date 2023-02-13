import { useState, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { useDispatch, useSelector } from 'react-redux'
import { setCharacterActive } from '../characters/charactersSlice'

import './card.scss'

const Character = (props) => {
  const { charInfo } = props
  const { id, name, description, price, img, agressive, medicine } = charInfo
  const dispatch = useDispatch()
  const { characterActive } = useSelector((state) => state.characters)
  const [show, setShow] = useState(false)
  const targetMedicine = useRef(null)
  const targetAggresive = useRef(null)

  let descr
  if (description === '' || !description) {
    descr = 'Нет описания'
  } else {
    descr = description
  }

  return (
    <Card>
      <Card.Img bsPrefix={'card__img'} src={img} />
      <Card.Body className="text-left card__body">
        <Card.Title className="text-left font-weight-bold">{name}</Card.Title>
        <Card.Text>{descr}</Card.Text>
        <Card.Text className="card__icons">
          {medicine ? (
            <OverlayTrigger
              key={'top'}
              placement={'top'}
              overlay={
                <Tooltip id={`tooltip-top`}>
                  Эта порода требует тщательного медицинского ухода
                </Tooltip>
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-capsule"
                viewBox="0 0 16 16"
              >
                <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429l4.243 4.242Z" />
              </svg>
            </OverlayTrigger>
          ) : null}
          {agressive ? (
            <OverlayTrigger
              key={'top'}
              placement={'top'}
              overlay={
                <Tooltip id={`tooltip-top`}>
                  Эта порода "злая". Они могут навредить вам!
                </Tooltip>
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="rgb(205, 36, 36)"
                class="bi bi-emoji-angry-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.053 4.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 0 1 .166.76c.071.206.111.44.111.687C7 7.328 6.552 8 6 8s-1-.672-1-1.5c0-.408.109-.778.285-1.049l-1.009-.504a.5.5 0 0 1-.223-.67zm.232 8.157a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 1 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5 0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5z" />
              </svg>
            </OverlayTrigger>
          ) : null}
        </Card.Text>
        <div className="card__price">
          <p className="fw-bold">Стоимость: {price}$</p>
          <Button
            variant={
              characterActive && characterActive?.id === id
                ? 'outline-danger'
                : 'success'
            }
            onClick={() => {
              if (characterActive?.id === id) {
                // нажимаем на уже выбранную картинку, чтобы её "отжать"
                dispatch(setCharacterActive(null))
              } else {
                // выбираем карточку
                dispatch(setCharacterActive(charInfo))
              }
            }}
          >
            {characterActive && characterActive?.id === id
              ? 'Выбрано'
              : 'Выбрать'}
          </Button>{' '}
        </div>
      </Card.Body>
    </Card>
  )
}

export default Character
