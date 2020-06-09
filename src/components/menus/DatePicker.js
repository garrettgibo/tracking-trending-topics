import React, { Component } from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap'

export class DatePicker extends Component {
    render() {
        return (
            <DropdownButton variant='Light' id="dropdown-item-button" title="Date Picker">
                <Dropdown.Item variant='Light' as="button">Past 7 days</Dropdown.Item>
                <Dropdown.Item variant='Light' as="button">Past 30 days</Dropdown.Item>
                <Dropdown.Item variant='Light' as="button">Past 12 months</Dropdown.Item>
                <Dropdown.Item variant='Light' as="button">Past 5 years</Dropdown.Item>
            </DropdownButton>
        )
    }
 }

export default DatePicker