
import Volume from './Volume';
function VolumeList(props){
    return(
    <ul>
        {props.volumes.map((volumes) => (
        <Volume
          id={volumes.id}
          image={volumes.image}
          title={volumes.title}
        />
      ))}
    </ul>

    ); 
}
export default VolumeList;