import Card from './ui/Card';
import Link from 'next/link';
import classes from './volume.module.css';
function Volume(props) {
    let i=props.id;
    return (
        <li className={classes.item}>
            <div className={classes.image}>
                <img src={props.image} alt={props.title} />
            </div>
            <div className={classes.content}>
                <h3>{props.title}</h3>
            </div>
            <div className={classes.actions}>
                <Link href={'/Isesuma/'+i}><a>test</a></Link>
            </div>
        </li>
    );
}
export default Volume;