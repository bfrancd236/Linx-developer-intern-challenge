import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Menu from './components/menu'
import Card from './components/card'
import Top from './components/top'
import Hits from './components/hits'
import Footer from './components/footer'

ReactDOM.render(
    <div >
        <Menu></Menu>
        <Card></Card>
        <Top></Top>
        <Hits></Hits>
        <Footer></Footer>
    </div>,
    document.getElementById('root')
)