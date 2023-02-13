import Character from '../character/Character'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchAllCharachers } from './charactersSlice'
import { useHttp } from '../../hooks/http.hook'

import './characters.scss'

const Characters = () => {
  const { charMassive, charactersStatus } = useSelector(
    (state) => state.characters
  )

  const dispatch = useDispatch()
  const { request } = useHttp()

  useEffect(() => {
    dispatch(fetchAllCharachers(request))

    // eslint-disable-next-line
  }, [])

  if (charactersStatus === 'loading') {
    return <h5 className="text-center mt-5">Загрузка...</h5>
  } else if (charactersStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const characters = charMassive.map((itemInfo, ind) => (
    <Character charInfo={itemInfo} key={ind} />
  ))

  return (
    <>
      <div className="characters__grid">{characters}</div>
    </>
  )
}

export default Characters
