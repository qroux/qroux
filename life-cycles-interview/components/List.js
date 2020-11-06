import React, { Component } from 'react';


class List extends Component {
  state = {
    users: []
  }

  async componentDidMount() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const toJson = await response.json()

    setTimeout(() => {
      this.setState({users: toJson})
    }, 3000)


    
  }

  renderUsers = () => {
		const users = this.state.users;
    const listItems = users.map((user) =>	{
      return (
        <div key={user.name}>
          <h4 >{user.name}</h4>
          <p>{user.id} - {user.address.city} </p>
        </div> 
      )
    })

    console.log(listItems)
    return listItems
  }


  render() {
    return (
      <div className="container">
        <h1>List of Users</h1>
        {this.state.users.length}
        {this.renderUsers()}

      </div> 
    )
  }
}


export default List;