import { Fragment } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

function Manga(props) {
    return <div>
        <Header />
        <div>
            <div className="flex flex-col justify-center mx-auto my-6 rounded-3xl sm:flex-row md:h-80 lg:bg-isesuma-purple">
                <img src={props.volumeList[0].imageCover} className="max-h-80 sm:w-full object-center self-end object-cover h-48 sm:h-60 w-full sm:object-contain md:h-80 lg:max-h-96 lg:object-cover xl:object-contain 2xl:object-contain bg-isesuma-darkpurple "></img>
                <div className="flex-box justify-center bg-isesuma-darkpurple max-h-80 overflow-auto sm:max-h-60 md:max-h-80 lg:h-96">
                    <h1 className="text-5xl my-1 text-white bg-transparent font-extralight text-center uppercase sm:text-4xl md:text-5xl lg:text-left lg:mx-4">{props.manga}</h1>
                    <h4 className="text-sm text-white bg-transparent mx-4 lg:text-base">{props.description}</h4>
                    <h4 className="text-sm text-white bg-transparent mx-4 lg:text-base my-2">Translators: {props.tn}</h4>
                    <ul className=" flex flex-row bg-transparent justify-center sm:my-3 lg:justify-start lg:mx-4">
                        <li className="bg-isesuma-darkblue rounded-md cursor-pointer mx-1 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={props.amazon}><span><h3 className="2xl text-white mx-1 font-light bg-transparent">  Amazon  </h3></span></Link></li>
                        <li className="bg-isesuma-darkblue rounded-md cursor-pointer mx-1 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={props.bookwalker}><span><h3 className="2xl text-white mx-1 font-light bg-transparent">  Bookwalker  </h3></span></Link></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className="text-white text-3xl font-extralight uppercase text-center">Check out the volumes below!</h1>
                <ul className=" justify-center mx-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-gap-3 2xl:grid-cols-8 xl:grid-cols-6">
                    {props.volumeList && props.volumeList.map(volume =>
                        <li key={volume.volumeNumber}><Link href={"/" + props.manga + "/volume" + volume.volumeNumber}>
                            <span>
                                <img src={volume.imageCover} className="max-h-96 w-auto rounded-2xl p-0 object-contain lg:mx-auto transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer">
                                </img>
                            </span></Link></li>)}
                </ul>
            </div>
        </div>
    </div>
}
export async function getStaticPaths() {

    let data = {}
    let mangaList = await import("../../public/mangas.json");
    if(mangaList && data){
        mangaList = mangaList.mangas
        for (let i = 0; i < mangaList[i].length; i++) {
            data[mangaList[i].mangaName] = await import("../../public/" + mangaList[i].mangaName + ".json");
        }

        const paths = []
        for (let i = 0; i < mangaList.length; i++) {
            paths.push("/" + mangaList[i].mangaName)
        }
        return { paths: paths, fallback: false}
        }
    }

export async function getStaticProps({ params }) {

    let volume = params.volume;
    let manga = params.manga;
    let data = await import("../../public/" + manga + ".json");
    let mangaL = await import("../../public/mangas.json");
    if (manga) {
        mangaL = mangaL.mangas
        let description = "test"
        let amazon = ""
        let bookwalker = ""
        let banner=""
        let translators=""
        for (let x = 0; x < mangaL.length; x++) {
            if (mangaL[x].mangaName === manga) {
                description = mangaL[x].description
                amazon = mangaL[x].amazon
                bookwalker = mangaL[x].bookwalker
                banner = mangaL[x].banner
                translators = mangaL[x].translators
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
                    description: description,
                    amazon: amazon,
                    bookwalker: bookwalker,
                    banner:banner,
                    tn:translators
                }
            };
        }
    }
}
export default Manga;