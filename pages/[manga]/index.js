import { Fragment } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

function Manga(props) {
    return <div>
        <Header />
        <Fragment>
            <div className="flex flex-row items-start mx-1 my-6 rounded-3xl"><img src={props.volumeList[0].imageCover} className="self-end max-h-96 w-auto"></img>
                <div className="flex-box self-end bg-isesuma-darkpurple">
                    <h1 className="text-6xl my-2 text-white bg-transparent font-extralight mx-4 uppercase sm:text-4xl">{props.manga}</h1>
                    <h4 className="text-lg text-white bg-transparent mx-4 font-light sm:text-sm">{props.description}</h4>
                    <ul className=" flex flex-row bg-transparent ">
                        <li className="bg-isesuma-darkblue rounded-md cursor-pointer mx-1 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={props.amazon}><span><h3 className="2xl text-white mx-1 font-light bg-transparent">  Amazon  </h3></span></Link></li>
                        <li className="bg-isesuma-darkblue rounded-md cursor-pointer mx-1 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"><Link href={props.bookwalker}><span><h3 className="2xl text-white mx-1 font-light bg-transparent">  Bookwalker  </h3></span></Link></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto my-5">
                <h1 className="text-5xl my-2 text-white bg-transparent font-light">Check out the volumes below!</h1>
            </div>
            <ul className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-gap-3">
                {props.volumeList && props.volumeList.map(volume =>
                    <li key={volume.volumeNumber}><Link href={"/" + props.manga + "/volume" + volume.volumeNumber}><span><img src={volume.imageCover} className="max-h-96 w-auto rounded-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"></img></span></Link></li>)}
            </ul>
        </Fragment>

    </div>
}
export async function getStaticPaths() {

    let data = {}
    let mangaList = await import("../../public/mangas.json");
    if(mangaList && data){
        console.log(mangaList)
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
        let tn=""
        for (let x = 0; x < mangaL.length; x++) {
            if (mangaL[x].mangaName === manga) {
                description = mangaL[x].description
                amazon = mangaL[x].amazon
                bookwalker = mangaL[x].bookwalker
                banner = mangaL[x].banner
                tn = mangaL[x].tn
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
                    tn:tn
                }
            };
        }
    }
}
export default Manga;