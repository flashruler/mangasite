import styles from './header.module.css'
import Link from 'next/link';
function Header() {
    return (
        <div className="flex flex-col mx-auto justify-center border-b-2 border-white my-4">
            {/* <div className="flex-shrink-0">
                <Link href='/'><a><img src="https://i.ibb.co/ZMj9gXT/TLS-LOGO.png" className="justify-center"></img></a></Link>
            </div> */}
            <div className="flex flex-row justify-center"><h1 className="text-white text-5xl font-extralight uppercase">The Lost Smartphone</h1></div>

            <nav className="flex flex-row justify-center">
                    <ul className="flex flex-row justify-center">
                        <li><Link href='#'><a className="text-2xl no-underline text-white uppercase font-light mx-3">About Us</a></Link></li>
                        <li><Link href='#'><a className="text-2xl no-underline text-white uppercase font-light mx-3">FAQ</a></Link></li>
                        <li><Link href='#'><a className="text-2xl no-underline text-white uppercase font-light mx-3">Donate</a></Link></li>
                    </ul>
            </nav>
        </div>
    );
}
export default Header;
