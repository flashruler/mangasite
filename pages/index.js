import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, { Component } from "react"
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
        console.log(response.data[0]);
        that.setState({ series: response.data })

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }
  render() {
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
          <div className='volumes'>
          <Link href="/posts/isesumaV1">
          <img src= "https://images-na.ssl-images-amazon.com/images/I/812W8iTBYZL.jpg"></img>
            </Link>
          
          </div>
        </div>
      </div>
    );
  }
}
