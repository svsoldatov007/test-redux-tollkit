import { useMatch, Link } from 'react-router-dom'

import './customLink.scss'
const CustomLink = ({ to, children, ...props }) => {
  const match = useMatch(to)
  return (
    <>
      <Link
        className={`custom-link ${match ? 'custom-link_active' : ''}`}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </>
  )
}

export default CustomLink
