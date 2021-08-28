import Header from '../components/Header';
function faq(){
return(
<div>
<Header/>
<div className="flex flex-col">
    <h1 className="text-white text-3xl font-light uppercase text-center">Frequently Asked Questions</h1>
    <div className="my-3 mx-4">
        <h1 className="text-white text-xl font-extralight uppercase text-center"> Q: What is this site?</h1>
        <h2 className="text-white text-base font-extralight uppercase text-center"> A: Its the official website for The Lost Smartphone, a new manga scanlation team</h2>
    </div>
    {/* <div className="my-3 mx-4">
        <h1 className="text-white text-xl font-extralight uppercase text-center"> Q: Why host volumes 1-10 of smartphone?</h1>
        <h2 className="text-white text-base font-extralight uppercase text-center"> A: To keep consistency for readers so they can enjoy the full series! Additionally, we take strides to give proper credit to our predecessors by linking to their social channels</h2>
    </div> */}
    <div className="my-3 mx-4">
        <h1 className="text-white text-xl font-extralight uppercase text-center"> Q: Will there be more than just smartphone?</h1>
        <h2 className="text-white text-base font-extralight uppercase text-center"> A: Eventually yes!</h2>
    </div>
    <div className="my-3 mx-4">
        <h1 className="text-white text-xl font-extralight uppercase text-center"> Q: Where is _______ feature?</h1>
        <h2 className="text-white text-base font-extralight uppercase text-center"> A: The developer is 1 person currently going to university, give them some time and the feature will eventually be added</h2>
    </div>
    <div className="my-3 mx-4">
        <h1 className="text-white text-xl font-extralight uppercase text-center"> Q: email?</h1>
        <h2 className="text-white text-base font-extralight uppercase text-center"> A: we can be contacted at tls@tls.quest</h2>
    </div>
    <div className="my-3 mx-4">
        <h1 className="text-white text-xl font-extralight uppercase text-center"> Q: Who made the site?</h1>
        <h2 className="text-white text-base font-extralight uppercase text-center"> A: Edlweiss did using the magic of NextJS, TailwindCSS, and Vercel!</h2>
    </div>
</div>
</div>
);
}
export default faq;