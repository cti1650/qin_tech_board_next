import Link from 'next/link';
import Nav from './nav';
import Logo from '../qin/Logo'

function QinHeader() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Logo />
          </a>
        </Link>
        <Nav/>
      </div>
    </header>
  )
}

export default QinHeader
