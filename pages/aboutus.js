import { render } from "react-dom"
import Header from '../components/Header';

function aboutus() {
    const members = [
        {
            name: "Athk",
            role: "Raw Provider",
            id: 1
        },
        {
            name: "The Gibber",
            role: "Translator",
            id: 2
        },
        {
            name: "Nakamochi",
            role: "The rest",
            id: 3
        },
        {
            name: "Lady Aqua",
            role: "Proofreader",
            id: 4
        },
        {
            name: "Edlweiss",
            role: "Web Developer",
            id: 5
        },
    ]
    return (
        <div className='page'>
            <Header />
            <div className='box'>
                <div className='box'>
                    {/* <h1 className="title"> About Us</h1> */}
                    <p1 className='text'>Welcome to The lost Smartphone Web page. We are a simple and peaceful team that translates Japanese manga into English. We consist of a team that are fans of the manga that we translate, and would love to somethin sumthin...</p1>
                    {members.map(members =>
                        <li key={members.id}>
                            <div className='container'>
                                <h1 className='title2'>{members.name}</h1>
                                <h2 className='title3'>{members.role}</h2>
                            </div>
                        </li>)}
                </div>

            </div>
        </div>
    )
}
export default aboutus