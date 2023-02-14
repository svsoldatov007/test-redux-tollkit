import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import {
  closeAddCharModal,
  changeNameCharModal,
  changeImgCharModal,
  changeDescriptionCharModal,
  changeMedicineCharModal,
  changeAgressiveCharModal,
  changePriceCharModal,
  resetForm,
} from './modalsSlice'
import nextId from 'react-id-generator'
import { useForm } from 'react-hook-form'
import { addOneCharacter } from '../characters/charactersSlice'
import * as modalSelector from './modalsSelector'

const AddCharacterModal = () => {
  const dispatch = useDispatch()
  const isAddCharModal = useSelector(modalSelector.isAddCharModal)
  const addModal = useSelector(modalSelector.addModal)
  const { name, img, description, medicine, agressive, price } = addModal

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const closeAndResetModal = () => {
    reset()
    dispatch(closeAddCharModal())
    dispatch(resetForm())
  }

  const onSubmit = (data) => {
    // generate id for the cat
    const id = nextId() + String(Math.floor(Math.random() * 100000))
    dispatch(addOneCharacter({ id, ...data }))
    closeAndResetModal()
  }

  return (
    <>
      <Modal show={isAddCharModal} onHide={() => closeAndResetModal()}>
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
                  value: name,
                  onChange: (e) =>
                    dispatch(changeNameCharModal(e.target.value)),
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
                  value: price,
                  onChange: (e) =>
                    dispatch(changePriceCharModal(e.target.value)),
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
                  value: description,
                  onChange: (e) =>
                    dispatch(changeDescriptionCharModal(e.target.value)),
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
                  value: img,
                  onChange: (e) => dispatch(changeImgCharModal(e.target.value)),
                  required: 'Поле обязательное',
                })}
              />

              {errors.img && (
                <div className="invalid-feedback" style={{ display: 'block' }}>
                  {errors.img.message}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-4" controlId="exampleForm.ControlCheck1">
              <Form.Check
                label="Этой породе нужна особая медицинаская забота"
                type={'checkbox'}
                {...register('medicine', {
                  value: medicine,
                  onChange: (e) =>
                    dispatch(changeMedicineCharModal(e.target.value)),
                })}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="exampleForm.ControlCheck2">
              <Form.Check
                label="Эта порода агрессивна"
                type={'checkbox'}
                {...register('agressive', {
                  value: agressive,
                  onChange: (e) =>
                    dispatch(changeAgressiveCharModal(e.target.value)),
                })}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => closeAndResetModal()}>
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
