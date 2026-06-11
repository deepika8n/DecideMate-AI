import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: '#4f46e5',
        padding: '15px',
        display: 'flex',
        justifyContent: 'center',
        gap: '30px'
      }}
    >
      <Link
        to="/"
        style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Home
      </Link>

      <Link
        to="/search"
        style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Product Search
      </Link>

      <Link
        to="/compare"
        style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Compare Products
      </Link>

      <Link
  to="/alternatives"
  style={{
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  }}
>
  Alternative Finder
</Link>

<Link
  to="/ai"
  style={{
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  }}
>
  AI Advisor
</Link>

<Link
  to="/chat"
  style={{
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  }}
>
  AI Chat
</Link>
    </nav>
  )
}

export default Navbar