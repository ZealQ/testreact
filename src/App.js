import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    users: []
  }

  componentWillMount = () => {
    this.fetchUsers();
  }

  fetchUsers = () => {
    const obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "get",
    };
    fetch("/api/users", obj).then(res => {
      if (!res.ok) return Promise.reject(res.statusText);
      return res.json();
    }).then(res => this.setState({ users: res }))
      .catch(console.error)
  }

  handleChange = ({ target: { name, value } }) => {
    if (name === "phoneNumber") value = value.replace(/|D/g, "");
    this.setState({ [name]: value });
  }

  handelSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(this.state));
    const payload = { ...this.state };
    delete payload.users
    const obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify(this.state)
    };
    fetch("/api/form", obj).then(res => {
      if (!res.ok) return Promise.reject(res.statusText);
      return res.json();
    }).then(res => this.fetchUsers())
      .catch(console.error)
  }
  renderUsers = () => {
    return this.state.users.map(user => {
      return (
        <tr key={`${user.firstName}${user.phoneNumber}`}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.phoneNumber}</td>
        </tr>
      )
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <form onSubmit={this.handelSubmit}>
          <label htmlFor="first name"> First Name: </label>
          <input id="firstName" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
    
          <label htmlFor="last name">Last Name: </label>
          <input id="lastName" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
  
          <label htmlFor="phone number">Phone Number: </label>
          <input id="phoneNumber" type="number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} />

          <button type="submit"> Click Me </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.length ? this.renderUsers() : <tr></tr>}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
