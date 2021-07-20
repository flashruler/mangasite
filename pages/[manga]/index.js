import { Fragment } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

function Manga(props) {
    return <div className='page'>
        <Header/>      
        <Fragment>
            <h1>{props.manga}</h1>
            {/* List of Volumes */}
            <ul className='container'>
                {props.volumeList.map(volume =>
                    <li key={volume.volumeNumber}><Link href={"/" + props.manga + "/volume" + volume.volumeNumber}><span><img src={volume.imageCover} className='image1'></img></span></Link></li>)}
            </ul>
        </Fragment>
        <div className='container'>
            <h1 className='title'>Join our Discord</h1>
        </div>

    </div>
}
export async function getStaticPaths() {

    let data = {}
    let mangaList = await import("../../public/mangas.json");
    mangaList = mangaList.mangas

    for (let i = 0; i < mangaList[i].length; i++) {
        data[mangaList[i].mangaName] = await import("../../public/" + mangaList[i].mangaName + ".json");
    }

    const paths = []
    for (let i = 0; i < mangaList.length; i++) {
        paths.push("/" + mangaList[i].mangaName)
    }
    return { paths: paths, fallback: true }
}

export async function getStaticProps({ params }) {

    let volume = params.volume;
    let manga = params.manga;
    if (manga) {
        let data = await import("../../public/" + manga + ".json");
        data = data.volumes
        if (data) {
            let volumeList = []
            for (let i = 0; i < data.length; i++) { //searches for volume in URL
                volumeList.push({
                    volumeNumber: data[i].volumeNumber,
                    imageCover: data[i].cover
                }) //pushes chapter list of volume
            }
            return {
                props: {
                    volumeList: volumeList,
                    manga: manga
                }
            };
        }
    }
}
export default Manga;