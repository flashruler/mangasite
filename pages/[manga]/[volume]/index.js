import Link from 'next/link';
import { Fragment } from 'react';
import Header from '../../../components/Header';
function Volume(props) {
    console.log(props)
    if (props.chapterList) {
        return <Fragment>
            <Header />
            <h1 className="text-5xl my-4 text-white bg-transparent font-extralight text-center uppercase sm:text-4xl md:text-5xl lg:text-left lg:mx-4">{"Volume " + props.volume}</h1>
            <ul className=" justify-center mx-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-gap-3 2xl:grid-cols-8 xl:grid-cols-6">
                <li>
                    <div className="opacity-50"><Link href={"/"+props.manga}><span><svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 mx-auto" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
                    <h1 className="text-center text-white uppercase text-3xl font-light">back</h1></span></Link>
                    </div>
                </li>
                {props.chapterList && props.chapterList.map(chapter =>
                    <li key={chapter.chapterNumber}><Link href={"/" + props.manga + "/volume" + props.volume + "/" + chapter.chapterNumber}>
                        <span>
                            <img src={chapter.chapterCover} className="max-h-96 w-auto rounded-2xl p-0 object-contain lg:mx-auto">
                            </img>
                        </span></Link></li>)}
            </ul>
        </Fragment>
    }
    return (null)

}
export async function getStaticPaths() {

    let data = {}
    let mangaList = await import("../../../public/mangas.json");
    mangaList = mangaList.mangas

    for (let i = 0; i < mangaList[i].length; i++) {
        data[mangaList[i].mangaName] = await import("../../../public/" + mangaList[i].mangaName + ".json");
    }

    const paths = []
    for (let i = 0; i < mangaList[i].length; i++) {
        for (let k = 0; k < data[mangaList[i].mangaName].volumes.length; k++) {
            paths.push("/" + mangaList[i].mangaName + "/volume" + data[mangaList[i].mangaName].volumes[k].volumeNumber)
        }
    }
    return { paths: paths, fallback: true }
}

export async function getStaticProps({ params }) {

    let volume = params.volume;
    let manga = params.manga;
    volume = Number(volume.replace("volume", ""));
    if (manga) {
        let data = await import("../../../public/" + manga + ".json");
        data = data.volumes
        if (data) {
            let volumeIndex = -1;
            let chapterList = []
            for (let i = 0; i < data.length; i++) { //searches for volume in URL
                if (data[i].volumeNumber === volume) {
                    volumeIndex = i;
                }
            }
            for (let i = 0; i < data[volumeIndex].chapters.length; i++) { //iterate through each chapter
                chapterList.push(data[volumeIndex].chapters[i]) //pushes chapter list of volume

            }
            return {
                props: {
                    chapterList: chapterList,
                    volume: volume,
                    manga: manga
                }
            };
        }
    }
}
export default Volume;