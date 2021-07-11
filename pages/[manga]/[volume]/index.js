import Link from 'next/link';
import { Fragment } from 'react';
function Volume(props) {
    console.log(props)
    return <Fragment>
        <h1>Volume1</h1>
        <ul>
            {props.chapterList.map(chapter=>
            <li key={chapter}><Link href={"/"+props.manga+"/volume"+props.volume+"/c"+chapter}>{"chapter "+chapter}</Link></li>)}
        </ul>
    </Fragment>
}
export async function getStaticPaths() {

    let data = {}
    let mangaList = await import("../../../public/mangas.json");
    mangaList = mangaList.mangas

    for (let i = 0; i < mangaList.length; i++) {
        data[mangaList[i].mangaName] = await import("../../../public/" + mangaList[i].mangaName + ".json");
    }

    const paths = []
    for (let i = 0; i < mangaList.length; i++) {
        for (let k = 0; k < data[mangaList[i].mangaName].volumes.length; k++) {
            paths.push("/" + mangaList[i].mangaName + "/volume" + data[mangaList[i].mangaName].volumes[k].volumeNumber)
        }
    }
    return { paths: paths, fallback: true }
}

export async function getStaticProps({ params }) {
    // const router = useRouter();
    // const c = router.query.chapter;
    // const volume = router.query.volume;
    // const manga = router.query.manga;
    // console.log(router.query);
    // console.log(manga);

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
                chapterList.push(data[volumeIndex].chapters[i].chapterNumber) //pushes chapter list of volume

            }
            return { props: { chapterList: chapterList,
             volume: volume,
            manga: manga} };
        }
    }
}
export default Volume;