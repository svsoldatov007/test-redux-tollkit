import Character from '../character/Character'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchAllCharachers } from './charactersSlice'
import { useHttp } from '../../hooks/http.hook'
import * as charactersSelectors from './charactersSelector'
import { filtredCharMassive } from '../toolbar/filtersSelector'

import './characters.scss'

const Characters = () => {
  const charMassive = useSelector(filtredCharMassive)
  const charactersStatus = useSelector(charactersSelectors.charactersStatus)

  // console.log(charMassive)

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

  let content
  if (charMassive.length) {
    const characters = charMassive.map((itemInfo, ind) => (
      <Character charInfo={itemInfo} key={ind} />
    ))
    content = <div className="characters__grid">{characters}</div>
  } else {
    content = <div className="text-center mt-5"> Таких данных не найдено</div>
  }
  // const characters =  charMassive.map((itemInfo, ind) => (
  //   <Character charInfo={itemInfo} key={ind} />
  // ))

  return (
    <>
      <div>{content}</div>
    </>
  )
}

export default Characters
