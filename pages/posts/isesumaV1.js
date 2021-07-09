import Link from 'next/link'

export default function isesumaV1() {
    
  
      return (
        <div className='page'>
          <div className='header'>
            <h1>Mango Reader</h1>
          </div>
          <div className='box'>
            <div className='launch'>
              <h1>What is this?</h1>
              <p1>This is website dedicated to Isesuma (In another world with my smartphone). Some other manga will be here however this is only an experimental website</p1>
            </div>
            {/* <div className='volumes'>
            <img src= "https://images-na.ssl-images-amazon.com/images/I/812W8iTBYZL.jpg"></img>
            </div> */}
          </div>
          {this.state.series.volumes && this.state.series.volumes[0].chapter1.map((value, index) => {
              return (
                <div className='box' key={index}>
                  <img src={value}>
                  </img>
                </div>
              )
          })}
        </div>
      );
    }
    // getStaticProps(){
  
  
    // }
  