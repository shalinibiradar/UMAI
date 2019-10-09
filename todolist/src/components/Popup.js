import React from 'react';
import './style.css';



class Popup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      dueDate: ''
    }
  }

  updateDueDate = () => {

    const itemData = JSON.parse(localStorage.getItem("Items"))

    for (var i = 0; i < itemData.length; i++) {
      if (itemData[i].id === this.props.id) {

        if (this.state.dueDate === '') {
          itemData[i].duedate = this.props.dueDate
        }
        if (this.state.dueDate !== '') {
          itemData[i].duedate = this.state.dueDate
        }
        if (this.state.title === '') {
          itemData[i].title = this.props.title
        }
        if (this.state.title !== '') {
          itemData[i].title = this.state.title
        }

        itemData[i].status = 'pending'
        itemData[i].completeddate = ''
      }
    }

    alert("To Do Item updated Successfully")
    localStorage.clear()
    localStorage.setItem("Items", JSON.stringify(itemData))
    window.location.reload(false);
    console.log("item after update" + JSON.stringify(itemData))
  }



  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h4 className='HeaderStyle'>{this.props.text}</h4>
          <h5>Current To Do Item : {this.props.title}</h5>
          <h5>Current Due Date : {this.props.dueDate}</h5>
          <h5>Current Completed Date : {this.props.completedDate ? <span>{this.props.completedDate}</span> : <span>NA</span>}</h5>
          <input className='InputStyle' placeholder='Update Due Date' onChange={(e) => this.setState({ dueDate: e.target.value })} type='date'></input>
          <input type='text' placeholder='Update To Do Item...' onChange={(e) => this.setState({ title: e.target.value })}></input>
          <div>

            <button onClick={this.updateDueDate}>Update</button>

            <button className='closeStyle' onClick={this.props.closePopup}>Close</button>

          </div>

        </div>
      </div>
    );
  }
}

export default Popup