import React, { Component } from 'react'
import '../App.css';
import DatePicker from './menus/DatePicker';



export class Picker extends Component {
    render() {
        return (
            <div className='picker feature-container'>
                <div className='picker-container flex-100 layout-row'>
                    <div>
                        <DatePicker />
                    </div>
                    <div>
                        <DatePicker />
                    </div>
                </div>
            </div>
        )
    }
}

export default Picker
