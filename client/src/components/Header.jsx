import logo from '../assets/logo.png'

const Header = () => {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className='container'>
            <a className='navbar-brand ' href="/">
                <div className='d-flex align-items-center '>
                    <img className='me-3' src={logo} alt="logo" />
                    <div>graphql demo</div>
                </div>
            </a>
        </div>
    </nav>
  )
}

export default Header