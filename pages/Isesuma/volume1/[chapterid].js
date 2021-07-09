import { useRouter } from 'next/router';

function chapter1(){
    const router = useRouter(); //access concrete data 
    const chapterid = router.query.chapterid;
    //send a request to backend API
    //to fetch chapter and images
    console.log(router.query.chapterid);
    return <h1>chapter1</h1>
}

export default chapter1;