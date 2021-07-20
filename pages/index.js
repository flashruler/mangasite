import Link from 'next/link';
import { Fragment, PureComponent } from 'react';
import React, { Component } from 'react';
import Header from './components/header';
function HomePage(props) {
    return (
        <div className='page'>
            <header /> 
            <div className='box'>
                <div className='title'>
                    <h1>Featured Manga</h1>
                </div>
                <Fragment>
                    <ul className='containerManga'>

                        {props.mangaList.map(manga =>
                            <li key={manga.mangaName}>
                                <Link href={"/" + manga.mangaName}><span><img src={manga.mangaCover} class='image1'></img></span></Link>
                            </li>)}
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