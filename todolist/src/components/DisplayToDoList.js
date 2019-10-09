import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from './Popup';



export class DisplayToDoList extends Component {

    constructor() {
        super()
        this.state = {
            toDoItem: {},
            showPopup: false
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
        })
        console.log("data of state on click" + JSON.stringify(this.state.toDoItem))


    }


    CompleteToDoItem = () => {
        if (this.state.toDoItem.id) {
            this.props.dispatch({
                type: "completeTodo",
                id: this.state.toDoItem.id
            })
        }

        else {
            window.alert("Please select checkbox of To Do Item")
        }

    }

    DeleteToDoItem = () => {
        if (this.state.toDoItem.id) {
            this.props.dispatch({
                type: "deleteTodo",
                id: this.state.toDoItem.id
            })
        }
        else {
            window.alert("Please select checkbox of To Do Item")
        }


    }


    render() {

        console.log("data in local" + JSON.stringify(this.props.allitems))

        if (this.props.allitems) {
            return (

                <div style={this.getStyle()}>
                    <h4>Pending To Do Items</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Due Date</th>
                                <th>Completed Date</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        {this.props.allitems.map(x => {
                            if (x.status === 'pending') {
                                return (
                                    <tbody>
                                        <tr>
                                            <td><input onClick={this.handleClick.bind(this, x)} type='checkbox'></input>{' '}{x.title}</td>
                                            <td>{x.duedate}</td>
                                            <td>NA</td>
                                            <td><button className='completeButton' onClick={this.CompleteToDoItem}>Complete To Do Item </button></td>
                                            <td><button className='completeButton' onClick={this.togglePopup.bind(this)}>Edit</button></td>
                                            <td> <button className='completeButton' onClick={this.DeleteToDoItem} ><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                        </tr>
                                    </tbody>

                                )

                            }
                        })}

                    </table>

                    {this.state.showPopup ?
                        <Popup
                            text='Update To Do Item of Pending List Displayed'
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
            return (<div>No To Do Items</div>)
        }

    }
}

let mapStateToProps = function (state) {

    return {
        // allTodos : state.todos,
        allitems: JSON.parse(localStorage.getItem("Items"))
    }

}

let ConnectedDisplayTodos = connect(mapStateToProps)(DisplayToDoList)

export default ConnectedDisplayTodos;