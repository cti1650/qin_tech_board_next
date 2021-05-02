import Link from 'next/link';

function Nav() {
  return (
    <nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
      <Link href='/'>
        <a className='mr-5 hover:text-gray-900'>ALL</a>
      </Link>
      <Link href='/onlyReact'>
        <a className='mr-5 hover:text-gray-900'>React</a>
      </Link>
      <Link href='/onlyVue'>
        <a className='mr-5 hover:text-gray-900'>Vue</a>
      </Link>
      <Link href='/onlyPython'>
        <a className='mr-5 hover:text-gray-900'>Python</a>
      </Link>
      <Link href='/form'>
        <a className='mr-5 hover:text-gray-900'>Form</a>
      </Link>
      <Link href='/HockForm'>
        <a className='mr-5 hover:text-gray-900'>Form2</a>
      </Link>
    </nav>
  );
}

export default Nav;
