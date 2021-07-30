import Header from '../components/Header';
function aboutus(){
return(
<div>
    <Header/>
    <div className="flex flex-col justify-center">
    <h1 className="text-white text-3xl font-light uppercase text-center">About Us</h1>
        <h1 className="text-white text-lg font-light uppercase text-center mx-4 my-3">Welcome to The lost Smartphone Web page. We are a simple and peaceful team that translates Japanese manga into English. We consist of a team that are fans of the manga that we translate, and would love to translate more projects in the future!</h1>
        <div className="flex flex-col text-center">
            <h1 className="text-isesuma-purple text-3xl font-light uppercase mx-4 my-3">Our Team</h1>
            <ul className="text-isesuma-lightblue text-2xl font-extralight uppercase text-center mx-4 my-1">
                <li><h1>Athk - Raw Provider</h1></li>
                <li><h1>The Gibber - Translator</h1></li>
                <li><h1>Nakamochi - The Rest</h1></li>
                <li><h1>Lady Aqua - Proofreader</h1></li>
                <li><h1>Edlweiss - Developer</h1></li>
            </ul>
        </div>
        <h1 className="text-white text-lg font-light uppercase text-center mx-4 my-4">Contact us on discord or email via tls@tls.quest</h1>
    </div>

    

</div>
);
}
export default aboutus;