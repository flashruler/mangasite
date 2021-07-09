import VolumeList from '../components/VolumeList';

const VOLUME_LIST =[
    {
        id: 'volume1',
        title:'volume 1',
        image: 'https://images-na.ssl-images-amazon.com/images/I/812W8iTBYZL.jpg',
        link:'/volume1'
    },
    {
        id: 'volume2',
        title:'volume 2',
        image: 'https://images-na.ssl-images-amazon.com/images/I/81Y0gcAGlGS.jpg',
        link:'/volume1'
    }
]
function Isesuma(){
    return <VolumeList volumes={VOLUME_LIST}/>
}
export default Isesuma;