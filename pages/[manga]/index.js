import { Fragment } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

function Manga(props) {
    return <div>
        <Header />
        <Fragment>
            <div className='title'>
                <h1 className="5xl my-4">{props.manga}</h1>
            </div>
            <div className="mx-auto my-6"><h4 className="3xl text-white">{props.description}</h4></div>
            <ul className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-gap-3">
                {props.volumeList && props.volumeList.map(volume =>
                    <li key={volume.volumeNumber}><Link href={"/" + props.manga + "/volume" + volume.volumeNumber}><span><img src={volume.imageCover} className="max-h-96 w-auto rounded-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"></img></span></Link></li>)}
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
        let mangaList = await import("../../public/mangas.json");
        mangaList = mangaList.mangas
        let description = "test"
        console.log(mangaList[0].mangaName)
        for (let x = 0; x < mangaList.length; x++) {
            console.log(mangaList[x].mangaName)
            if (mangaList[x].mangaName === manga) {
                description = mangaList[x].description
                console.log(description)
            }
        }
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
                    manga: manga,
                    description: description
                }
            };
        }
    }
}
export default Manga;