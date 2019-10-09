import React, { Component } from 'react';
import { connect } from 'react-redux';

export class AddTodo extends Component {
    state = {
        title: '',
        Date: ''
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.title && this.state.Date) {
            this.props.dispatch({
                type: "newTodo",
                content: this.state.title,
                dueDate: this.state.Date
            })
            window.alert("To Do Item Added Successfully")
        }
        else {
            window.alert("Please add To Do Item and Due Date")
        }
    }

    onTitleChange = (e) => this.setState({ title: e.target.value });

    onDueDateChange = (e) => this.setState({ Date: e.target.value })

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <label>Add To Do Item</label>
                <input
                    type="text"
                    name="title"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Add Todo..."
                    value={this.state.title}
                    onChange={this.onTitleChange}

                />
                <label>Add Due Date</label>
                <input
                    type="date"
                    name="date"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Add Due Date"
                    onChange={this.onDueDateChange}
                />
                <input
                    type="submit"
                    value="Add To Do Item"
                    className="btn"
                    style={{ flex: '1' }}
                />
            </form>
        )
    }
}

let ConnectedInputTodos = connect()(AddTodo)

export default ConnectedInputTodos;
