import { useRouter } from 'next/router';
import React, { useState } from "react";
import Link from 'next/link';

function Chapter(props) {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        const parsedCount = Number(localStorage.getItem("count") || 0)
        setCount(parsedCount)
    }, [])

    React.useEffect(() => {
        localStorage.setItem("count", count)
    }, [count])
    if (props.chapterImages) {
        return (
            <div className='page'>

                {console.log(props.chapterImages)}

                <div>
                    if(props.chapterImages){<img src={props.chapterImages[count]} class='image2' className='box'></img>}



                </div>
                <div className='box'>
                    <button onClick={() => {
                        if (count != 0) {
                            setCount(0)
                        }
                    }}>
                        {'Back to Start'}
                    </button>

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
            </div>

        );
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
            for (let j = 0; j < data[mangaList[i].mangaName].volumes[k].chapters.length; j++) {
                paths.push("/" + mangaList[i].mangaName + "/volume" + data[mangaList[i].mangaName].volumes[k].volumeNumber + "/c" + data[mangaList[i].mangaName].volumes[k].chapters[j].chapterNumber)
            }
        }
    }


    return { paths: paths, fallback: true }
}

export async function getStaticProps({ params }) {

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
                if (data[i].volumeNumber === volume) {
                    volumeIndex = i;
                }
            }
            for (let i = 0; i < data[volumeIndex].chapters.length; i++) {
                if (data[volumeIndex].chapters[i].chapterNumber === c) {
                    chapterImages = data[volumeIndex].chapters[i].images;
                    return {
                        props: {
                            chapterImages: chapterImages,
                            volumeNumber: volumeIndex,
                            manga: manga
                        }
                    };
                }
            }
        }
    }
}
export default Chapter
