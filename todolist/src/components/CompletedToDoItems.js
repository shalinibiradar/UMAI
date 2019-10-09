import React, { Component } from 'react';
import Popup from './Popup';



export class CompletedToDoItems extends Component {

    constructor(props) {
        super(props)
        this.state = {
            completeddata: JSON.parse(localStorage.getItem("Items")),
            showPopup: false,
            toDoItem: {}
        }
    }

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

    getStyle = () => {
        return {
            background: '#F4F4F4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
        }
    };

    handleClick(data, e) {
        this.setState({
            toDoItem: data
        });
    }

    render() {
        console.log("Due date" + this.state.dueDate)
        console.log("data in local" + JSON.stringify(this.state.completeddata))
        if (this.state.completeddata) {
            return (

                <div style={this.getStyle()}>
                    <h4>Completed To Do Items</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Due Date</th>
                                <th>Completed Date</th>
                                <th></th>
                            </tr>
                        </thead>

                        {this.state.completeddata.map(x => {
                            if (x.status === 'CompletedToDoItem') {
                                return (
                                    <tbody>
                                        <tr>
                                            <td><input type='checkbox' onClick={this.handleClick.bind(this, x)}></input>{' '}{x.title}</td>
                                            <td>{x.duedate}</td>
                                            <td>{x.completeddate}</td>
                                            <td><button className='completeButton' onClick={this.togglePopup.bind(this)}>Add To Pending To Do List</button></td>

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
            return (<div>No Completed To Do Items</div>)
        }



    }


}

export default CompletedToDoItems;