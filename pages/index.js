import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
//import volume1 from '../components/volume1.js';
import React, { Component } from "react"
import generateVolume1 from '../components/volume1.js';
const axios = require('axios');



export default class extends Component {
  state = {
    series: []
  }
  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    let that = this
    axios.get('smartphone.json')
      .then(function (response) {
        console.log(response.data.volumes[0].chapter1);
        that.setState({ series: response.data})

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  render() {
    generateVolume1();
 return(
  <div className='page'>
    <div className='header'>
            <h1>Le Manga Site</h1>
          </div>
          {this.state.series && this.state.series.volumes[0].map((value, index) => {
          if (index < 3) {
            return (
              <div className='box' key={index} >
                <div className='launch'>
                  <h1>{value.name}</h1>
                </div>
              </div>
            )
          }
          else {
            return (<div key={index} ></div>)
          }
        })}
          </div>
 );
  }
  // getStaticProps(){


  // }
}
