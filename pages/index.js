import Link from 'next/link';
import { Fragment, PureComponent } from 'react';
import React, { Component } from 'react';
import Header from '../components/Header';
function HomePage(props) {
    return (

        <div>
            <Header />
            <div className="flex-box justify-items-start">
                <div className='title'>
                    <h1 className="5xl my-4">Featured Manga</h1>
                </div>
                <Fragment>
                    <ul className="grid gap-4 grid-cols-3 justify-items-start">
                        <div className="inline-flex">
                            {props.mangaList.map(manga =>
                                <li key={manga.mangaName}>
                                    <Link href={"/" + manga.mangaName}><span><img src={manga.mangaCover} className="max-h-96 w-auto rounded-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"></img></span></Link>
                                </li>)}
                        </div>
                    </ul>
                </Fragment>
            </div>



        </div>
    );

}

export async function getStaticProps({ params }) {
    let mangaList = await import("../public/mangas.json");
    mangaList = mangaList.mangas
    return {
        props: {
            mangaList: mangaList
        }
    };

}

export default HomePage;