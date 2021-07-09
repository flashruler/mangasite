import Link from 'next/link';
import { Fragment } from 'react';
function Volume1() {
    return <Fragment>
        <h1>Volume1</h1> 
        <ul>
            <li><Link href="/Isesuma/volume1/c1">Chapter 1</Link></li>
            <li><Link href="/Isesuma/volume1/c2">Chapter 2</Link></li>
        </ul>
    </Fragment>
}
export default Volume1;