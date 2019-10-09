import React, { Component } from 'react';
import Popup from './Popup';

export class TrashedToDoItems extends Component {

    constructor() {
        super()
        this.state = {
            deleteddata: JSON.parse(localStorage.getItem("Items")),
            showPopup: false,
            toDoItem: {}
        }
    }

    getStyle = () => {
        return {
            background: '#F4F4F4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
        }
    };

    togglePopup() {
        if (this.state.toDoItem.id) {
            this.setState({
                showPopup: !this.state.showPopup
            });
        }
        else {
            window.alert("Please select checkbox of To Do Item")
        }
    }

    handleClick(data, e) {
        this.setState({
            toDoItem: data
        });
    }

    render() {

        if (this.state.deleteddata) {
            return (

                <div style={this.getStyle()}>
                    <h4>Deleted To Do Items</h4>

                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Due Date</th>
                                <th>Completed Date</th>
                                <th></th>
                            </tr>
                        </thead>

                        {this.state.deleteddata.map(x => {
                            if (x.status === 'DeletedToDoItem') {
                                return (
                                    <tbody>
                                        <tr>
                                            <td><input type='checkbox' onClick={this.handleClick.bind(this, x)}></input>{' '}{x.title} </td>
                                            <td>{x.duedate}</td>
                                            <td>NA</td>
                                            <td><button className='completeButton' onClick={this.togglePopup.bind(this)} >Restore To Do Item</button></td>
                                        </tr>
                                    </tbody>)
                            }
                        })}

                    </table>

                    {this.state.showPopup ?
                        <Popup
                            text='Update To Do Item to move into pending To Do List'
                            dueDate={this.state.toDoItem.duedate}
                            id={this.state.toDoItem.id}
                            title={this.state.toDoItem.title}
                            completedDate={this.state.toDoItem.completeddate}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }



                </div>

            )

        }

        else {
            return (<div>No Trashed To Do Items</div>)
        }



    }


}

export default TrashedToDoItems;