import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import axios from 'axios';

/**
  Instructions

  1 Fetch the users from api - https://jsonplaceholder.typicode.com/users
  2 Display the users in a list (`Name - Email` or similar)
  3 Add the feature to search through users from search box by name.
    - Search should filter upon change in the input
  4 Add the feature to clear the search box and reset the user list to show all
  5 Add the feature that, when a user is clicked, display the that users info as a selected user

  Please use all resources you want to, this is a fully open-book
  challenge. Google away.

  Don't be overly concerned with error handling, etc. This is a small evaluation.
  Feel free to add dependencies to the left if you need them.
**/


export default class UserComponent extends Component {

  _url = "https://jsonplaceholder.typicode.com/users"

  state = {
    persons: [],
    term: '',
    infoStatus: false,
    moreInfo: []
  }

  componentDidMount() {
    axios.get(this._url)
      .then((res) => {
        this.setState({
          persons: res.data,
          infoStatus: false
        })
      })
  }

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
  }
  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  moreInfo = (e) => {
    this.state.persons.map((i) => {
      if (e.target.id == i.id) {
        this.setState({ moreInfo: [i], infoStatus: true })
      }
    })
  }

  clearSearch = () => this.setState({ term: '' })

  render() {

    const itemsToMap = this.search(this.state.persons, this.state.term)

    const elementInfo = this.state.moreInfo.map((elem) => {
      return (
        <div key={elem} className="infoPanel" >
          <h1>{elem.name}</h1>
          <p><b>Username:</b> {elem.username}</p>
          <p><b>Email: </b>{elem.email}</p>
          <p><b>Phone:</b> {elem.phone}</p>
          <p><b>Street: </b>{elem.address.street}</p>
          <p><b>Suite: </b>{elem.address.suite}</p>
          <p><b>City: </b>{elem.address.city}</p>
          <p><b>Zipcode: </b>{elem.address.zipcode}</p>
        </div>
      )
    })
    const renderInfo = this.state.infoStatus ? elementInfo : <h2 className="infoPanel">Chose the person</h2>
    return (
      <div className="container mt-5">
        <h2>Search Users</h2>
        <div className="input-group mb-5 mt-3">
          <div className="input-group-prepend">
            <button type="button" className="input-group-text" onClick={this.clearSearch}>
              <span>X</span>
            </button>
          </div>
          <input
            onChange={this.onSearchChange}
            value={this.state.term}
            type="text"
            className="form-control"
            placeholder="Search Users"
          />
        </div>
        <div className="gridPanel">
          <div>
            <h4>Users</h4>
            <ul className="list-group">
              {itemsToMap.map(person => <li key={person.id} onClick={this.moreInfo} id={person.id} className="list-group-item">
                <span id={person.id}><b id={person.id}>#</b>{person.id}</span>
                <span id={person.id}><b id={person.id}>name: </b>{person.name}</span>
                <span id={person.id} className="list-group-span"><b id={person.id}>phone: </b>{person.phone}</span>
              </li>)}
            </ul>
          </div>
          {renderInfo}
        </div>
      </div>
    );
  }
}

function App() {
  return <UserComponent />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
