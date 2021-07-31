import { useRouter } from 'next/router';
import React, { useState } from "react";
import Link from 'next/link';
import Header from '../../../components/Header';

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
            <div>
                <Header />
                <div className="flex flex-col">
                    {/* <h1 className="text-white text-xl font-extralight uppercase text-center my-5 mx-6"> Currently the reader has a bug where you have to press Back to Start after finishing a chapter. It will be fixed in update 1.1</h1> */}
                    <div className="flex justify-center">
                        <div>
                            <img src={props.chapterImages[count]} className="h-auto w-auto cursor-pointer z-0" onClick={() => {
                                if (count != props.chapterImages.length - 1) {
                                    setCount(count + 1)
                                    window.scrollTo(0,0)
                                }
                                if (count === props.chapterImages.length - 1 && props.chapterNum != props.chapters[props.chapters.length - 1].chapterNumber) {
                                    return(<Link href={"/" + props.manga + "/volume" + props.volume + "/" + props.chapterNum + 1}></Link>);

                                }
                            }}></img>
                        </div>

                    </div>
                    <div className="flex flex-row justify-center my-3">
                        <a className="bg-isesuma-darkblue rounded-md cursor-pointer mx-2 2xl text-white font-light no-underline align-middle self-center" onClick={() => {
                            if (count != 0) {
                                setCount(0)
                            }
                        }}>
                            <h1 className="text-white font-light no-underline align-middle bg-transparent py-3 px-3" > Back to Start</h1>
                        </a>
                        <a className="bg-isesuma-darkblue rounded-md cursor-pointer mx-2 self-center 2xl text-white font-light no-underline align-middle" onClick={() => {
                            if (count != 0) {
                                setCount(count - 1)
                                window.scrollTo(0,0)
                            }
                        }}>
                            <h1 className="text-white font-light no-underline align-middle bg-transparent py-3 px-3" > {"<---"}</h1>
                        </a>
                        <a className="bg-isesuma-darkblue rounded-md cursor-pointer mx-2 self-center 2xl text-white font-light no-underline align-middle " onClick={() => {
                            if (count != props.chapterImages.length - 1) {
                                setCount(count + 1)
                                window.scrollTo(0,0)
                            }
                        }}>
                            <h1 className="text-white font-light no-underline align-middle bg-transparent py-3 px-3" > {"--->"}</h1>
                        </a>
                        <a>
                            <Link href={"/" + props.manga + "/volume" + props.volumeNumber} ><span className="flex flex-row bg-isesuma-darkblue rounded-md cursor-pointer self-center 2xl mx-2 text-white font-light no-underline align-middle" onClick={() =>{
                                console.log("yes")
                                if(count==props.chapterImages.length-1){
                                    setCount(0)
                                    console.log("test")
                                }
                            }}>
                                <h1 className="text-white font-light no-underline align-middle bg-transparent py-3 px-3"> Return </h1>
                                
                            </span></Link>
                        </a>


                    </div>
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
                            volumeNumber: volume,
                            manga: manga,
                            chapters: data[volumeIndex].chapters,
                            chapterNum: data[volumeIndex].chapters[i].chapterNumber
                        }
                    };
                }
            }
        }
    }
}
export default Chapter
