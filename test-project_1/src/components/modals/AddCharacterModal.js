import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import { closeAddCharModal } from './modalsSlice'
import nextId from 'react-id-generator'
import { useForm } from 'react-hook-form'
import { addOneCharacter } from '../characters/charactersSlice'

const AddCharacterModal = () => {
  const dispatch = useDispatch()
  const { isAddCharModal } = useSelector((state) => {
    return state.modals
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    // generate id for the cat
    const id = nextId() + String(Math.floor(Math.random() * 100000))
    console.log({ id, agressive: false, medicine: false, ...data })
    dispatch(
      addOneCharacter({ id, iagressive: false, medicine: false, ...data })
    )
    reset()
    dispatch(closeAddCharModal())
  }

  return (
    <>
      <Modal show={isAddCharModal} onHide={() => dispatch(closeAddCharModal())}>
        <Modal.Header closeButton>
          <Modal.Title>Добавление породы кошки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="mb-3">Название породы</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                {...register('name', {
                  required: 'Поле обязательное',
                })}
              />

              {errors.name && (
                <div className="invalid-feedback" style={{ display: 'block' }}>
                  {errors.name.message}
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Label className="mb-4">Стоимость (в долларах)</Form.Label>
              <Form.Control
                type="number"
                {...register('price', {
                  required: 'Поле обязательное',
                  valueAsNumber: true,
                  validate: {
                    positive: (v) =>
                      parseInt(v) > 0
                        ? parseInt(v) > 0
                        : 'Стоимость должна быть положительной',
                    norContainE: (v) => !String(v).includes('e'),
                  },
                })}
              />

              {errors.price && (
                <div className="invalid-feedback" style={{ display: 'block' }}>
                  {errors.price.message}
                </div>
              )}
            </Form.Group>

            <Form.Group
              className="mb-4"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="mb-3">Описание</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register('description', {
                  required: 'Поле обязательное',
                })}
              />

              {errors.description && (
                <div className="invalid-feedback" style={{ display: 'block' }}>
                  {errors.description.message}
                </div>
              )}
            </Form.Group>

            <Form.Group
              className="mb-4"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="mb-3">
                Вставьте URL картинки породы
              </Form.Label>
              <Form.Control
                placeholder="URL картинки"
                rows={3}
                {...register('img', {
                  required: 'Поле обязательное',
                })}
              />

              {errors.img && (
                <div className="invalid-feedback" style={{ display: 'block' }}>
                  {errors.img.message}
                </div>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => dispatch(closeAddCharModal())}
              >
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={() => handleSubmit(onSubmit)}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddCharacterModal
