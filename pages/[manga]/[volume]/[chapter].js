
import Link from 'next/link';
import Header from '../../../components/Header';
import { useHotkeys } from 'react-hotkeys-hook';
import React from 'react';
import helmet from 'react-helmet';


function Chapter(props) {
    const [count, setCount] = React.useState(0)
    const [controlsVisible, setControlsVisible] = React.useState(true)
    useHotkeys('right', () => {
        setCount(count => count + 1)
        window.scrollTo(0, 0)
    });
    useHotkeys('left', () => { setCount(count => count - 1) 
        window.scrollTo(0, 0)
    });

    if (props.chapterImages) {
        if (count === props.chapterImages.length) {
            setCount(props.chapterImages.length - 1);
        }
        if (count === -1) {
            setCount(0);
        }

        return (

            <div>
                <title>Read the latest chapter of Isesuma!</title>
                <meta content={"read chapter " + props.chapterNum + " of In Another World with my Smartphone now!"} property="og:title" />
                <meta content={props.description} property="og:description" />
                <meta content="https://embed.com/this-is-the-site-url" property="og:url" />
                <meta content={props.chapterCover} property="og:image" />
                <meta content="#43B581" data-react-helmet="true" name="theme-color" />
                <Header />
                {/* Reader Controls */}
                {/* <div className="z-20 fixed mx-2 bottom-0 flex flex-col my-2 h-100% w-100% bg-gray-500 rounded-md items-start bg-opacity-75">*/}
                <div className={"z-20 fixed mx-2 bottom-0 flex flex-col my-2 h-100% w-100% bg-gray-500 rounded-md items-start bg-opacity-75 " + (controlsVisible ? "" : "transition duration-500 ease-in-out invisible")}>
                    <h1 className="text-xl text-white font-light no-underline align-middle self-center bg-transparent my-2">Reader Controls</h1>

                    <div className="flex flex-row justify-center my-3 bg-transparent opacity-100">
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
                                window.scrollTo(0, 0)
                            }
                        }}>
                            <h1 className="text-white font-light no-underline align-middle bg-transparent py-3 px-3" > {"<"}</h1>
                        </a>
                        <a className="bg-isesuma-darkblue rounded-md cursor-pointer mx-2 self-center 2xl text-white font-light no-underline align-middle " onClick={() => {
                            if (count != props.chapterImages.length - 1) {
                                setCount(count + 1)
                                window.scrollTo(0, 0)
                            }
                        }}>
                            <h1 className="text-white font-light no-underline align-middle bg-transparent py-3 px-3" > {">"}</h1>
                        </a>
                        <a className="flex flex-row bg-isesuma-darkblue rounded-md cursor-pointer self-center 2xl mx-2 text-white font-light no-underline align-middle">
                            <Link href={"/" + props.manga + "/volume" + props.volumeNumber} ><span className="bg-isesuma-darkblue rounded-md" onClick={() => {
                                if (count == props.chapterImages.length - 1) {
                                    setCount(0)
                                }
                            }}>
                                <h1 className="text-white font-light no-underline align-middle bg-transparent py-3 px-3"> Return </h1>

                            </span></Link>
                        </a>
                    </div>

                </div>
                {/* Viewer */}
                <div className="flex flex-col">
                    <h1 className="justify-center my-2 2xl text-white font-light no-underline align-middle self-center">Please excuse the bugs on the current reader, we are doing our best to update!</h1>
                    <a className="bg-isesuma-darkblue rounded-md cursor-pointer mx-2 my-2 self-center 2xl text-white font-light no-underline align-middle " onClick={() => setControlsVisible(!controlsVisible)}>
                        <h1 className="text-white font-light no-underline align-middle bg-transparent py-3 px-3"> Toggle Reader Controls </h1>
                    </a>
                    {/* <h1 className="text-white text-xl font-extralight uppercase text-center my-5 mx-6"> Currently the reader has a bug where you have to press Back to Start after finishing a chapter. It will be fixed in update 1.1</h1> */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 bg-opacity-0 bg-gray-700 w-2/4 z-10" onClick={() => {
                                if (count < props.chapterImages.length - 1) {
                                    setCount(count + 1)
                                    window.scrollTo(0, 0)
                                }
                            }}></div>
                            <div className="absolute inset-y-0 left-0 bg-opacity-0 bg-gray-700 w-2/4 z-10" onClick={() => {
                                if (count > 0) {
                                    setCount(count - 1)
                                    window.scrollTo(0, 0)
                                }
                            }}></div>
                            <img src={props.chapterImages[count]} className="h-auto w-auto cursor-pointer z-0" onClick={() => {
                                if (count === props.chapterImages.length - 1 && props.chapterNum != props.chapters[props.chapters.length - 1].chapterNumber) {
                                    return (<Link href={"/" + props.manga + "/volume" + props.volume + "/" + props.chapterNum + 1}></Link>);

                                }
                            }}></img>
                        </div>

                    </div>
                </div>

            </div>

        );
    }
    return null;
}
//function to create dynamic paths for NextJS
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

// function to pull data from JSON and put intop props
export async function getStaticProps({ params }) {

    let c = params.chapter;
    let volume = params.volume;
    let manga = params.manga;

    c = Number(c.replace("c", ""));
    volume = Number(volume.replace("volume", ""));
    if (manga) {
        let data = await import("../../../public/" + manga + ".json");
        let desc = data.description
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
                    // console.log(data[volumeIndex].chapters[i].albumLink)
                    const res = await fetch("https://api.imgur.com/3" + data[volumeIndex].chapters[i].albumLink, {
                        method: 'GET', // or 'PUT'
                        headers: {
                            'Authorization': 'Client-ID 991550286979565',
                        },
                    })
                    const dataChapterImages = await res.json()
                    let chapterImages = []
                    for (let k = 0; k < dataChapterImages.data.length; k++) {
                        chapterImages.push(dataChapterImages.data[k].link)
                    }
                    return {
                        props: {
                            chapterImages: chapterImages,
                            volumeNumber: volume,
                            manga: manga,
                            chapters: data[volumeIndex].chapters,
                            chapterNum: data[volumeIndex].chapters[i].chapterNumber,
                            description: desc,
                            chapterCover: data[volumeIndex].chapters[i].chapterCover
                        }
                    };
                }
            }
        }
    }
}
export default Chapter
