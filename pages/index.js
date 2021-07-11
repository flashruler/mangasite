import Link from 'next/link';
import { Fragment } from 'react';
function HomePage(props) {
    return (
<Fragment>
        <ul>
            {props.mangaList.map(manga=>
            <li key={manga.mangaName}><Link href={"/"+manga.mangaName}><span><img src={manga.mangaCover}></img></span></Link></li>)}
        </ul>
    </Fragment>
    );

}

export async function getStaticProps({ params }) {
    let mangaList = await import("../public/mangas.json");
    mangaList = mangaList.mangas
    return {
        props: {
            mangaList: mangaList
        }
    };

}

export default HomePage;