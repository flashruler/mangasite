import Page from './page';
function Chapter(props){
    return(
    <ul>
        {props.pages.map((pages) => (
        <Page
          id={pages.id}
          image={pages.image}
          title={pages.title}
        />
      ))}
    </ul>

    ); 
}
export default Chapter;