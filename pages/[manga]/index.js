import VolumeList from '../components/VolumeList';
import { Fragment } from 'react';
import Link from 'next/link';

const VOLUME_LIST =[
    {
        id: 'volume1',
        title:'volume 1',
        image: 'https://images-na.ssl-images-amazon.com/images/I/812W8iTBYZL.jpg',
        link:'/volume1'
    },
    {
        id: 'volume2',
        title:'volume 2',
        image: 'https://images-na.ssl-images-amazon.com/images/I/81Y0gcAGlGS.jpg',
        link:'/volume1'
    }
]
function Isesuma(props){
    // return <VolumeList volumes={VOLUME_LIST}/>
    return <Fragment>
    <h1>{props.manga}</h1>
    <ul>
        {props.volumeList.map(volume=>
        <li key={volume.volumeNumber}><Link href={"/"+props.manga+"/volume"+volume.volumeNumber}><span><img src={volume.imageCover}></img></span></Link></li>)}
    </ul>
</Fragment>
}
export async function getStaticPaths() {

    let data = {}
    let mangaList = await import("../../public/mangas.json");
    mangaList = mangaList.mangas

    for (let i = 0; i < mangaList.length; i++) {
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
                volumeList.push({volumeNumber: data[i].volumeNumber,
                imageCover: data[i].cover}) //pushes chapter list of volume
            }
            return { props: { volumeList: volumeList,
            manga: manga} };
        }
    }
}
export default Isesuma;