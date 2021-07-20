import Link from 'next/link';
import classes from './volume.module.css';
function Page(props){
    return (
        <li className={classes.item}>
            <div className={classes.image}>
                <img src={props.images}/>
            </div>
        </li>
    );
}
export default Page;