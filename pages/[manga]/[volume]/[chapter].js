import { useRouter } from 'next/router';
import React, { useState } from "react";
// import Page from '../components/Page';

//import Chapter from '../components/chapter';
//manga.com/[name]/[volume]/[chapter]
//smartphone.volume1.c1
function Chapter(props) {
    const [count, setCount] = useState(0);

    return (

        <div className='page'>
            <div className='box'>ß
                <button onClick={() => {
                    if (count != 0) {
                        setCount(count - 1)
                    }
                }}>
                    {'<-'}
                    </button>
                <button onClick={() => {
                    if (count != props.chapterImages.length - 1) {
                        setCount(count + 1)
                    }
                }}>
                    {'->'}
                    </button>
            </div>
            <div className='box'>
                {
                    props.chapterImages.map((image, index) => {
                        return (
                            null)
                    })}
                <img src={props.chapterImages[count]}></img>
            </div>

        </div>

    );
}
export async function getStaticPaths() {

    let data = {}
    let mangaList = await import("../../../public/mangas.json");
    mangaList = mangaList.mangas

    for (let i = 0; i < mangaList.length; i++) {
        data[mangaList[i]] = await import("../../../public/" + mangaList[i] + ".json");
    }

    const paths = []
    for (let i = 0; i < mangaList.length; i++) {
        for (let k = 0; k < data[mangaList].volumes.length; k++) {
            for (let j = 0; j < data[mangaList].volumes[k].chapters.length; j++) {
                paths.push("/" + mangaList[i] + "/volume" + data[mangaList[i]].volumes[k].volumeNumber + "/c" + data[mangaList[i]].volumes[k].chapters[j].chapterNumber)
            }
        }
    }

    console.log("test")


    return { paths: paths, fallback: true }
}

export async function getStaticProps({ params }) {
    // const router = useRouter();
    // const c = router.query.chapter;
    // const volume = router.query.volume;
    // const manga = router.query.manga;
    // console.log(router.query);
    // console.log(manga);

    let c = params.chapter;
    let volume = params.volume;
    let manga = params.manga;
    c = Number(c.replace("c", ""));
    volume = Number(volume.replace("volume", ""));
    if (manga) {
        let data = await import("../../../public/" + manga + ".json");
        data = data.volumes
        if (data) {
            let volumeIndex = -1;
            let chapterImages = []
            for (let i = 0; i < data.length; i++) {
                if (data[i].volumeNumber = volume) {
                    volumeIndex = i;
                }
            }
            for (let i = 0; i < data[volumeIndex].chapters.length; i++) {
                if (data[volumeIndex].chapters[i].chapterNumber = c) {
                    chapterImages = data[volumeIndex].chapters[i].images;
                    return { props: { chapterImages: chapterImages } };
                }
            }
        }
    }
}
export default Chapter
