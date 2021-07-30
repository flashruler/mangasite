import styles from './header.module.css'
import Link from 'next/link';
function Header() {
    return (
<div className="flex flex-col justify-center flex-grow-1 border-b-2 border-white my-4 mx-auto">
                <h1 className="text-white text-2xl font-extralight uppercase text-center">The Lost Smartphone</h1>
                            <nav>
                    <ul className="flex flex-row justify-center">
                        <li><Link href='/'><a className="text-lg no-underline text-white uppercase font-light mx-3">Home</a></Link></li>
                        <li><Link href='/aboutus'><a className="text-lg no-underline text-white uppercase font-light mx-3">About Us</a></Link></li>
                        <li><Link href='/faq'><a className="text-lg no-underline text-white uppercase font-light mx-3">FAQ</a></Link></li>
                        <li><Link href='#'><a className="text-lg no-underline text-white uppercase font-light mx-3">Donate</a></Link></li>
                    </ul>
            </nav>
                
            </div>
    );
}
export default Header;
