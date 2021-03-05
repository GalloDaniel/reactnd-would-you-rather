import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthUser } from '../actions/authUser'
import { Header, Form, Dropdown, Button } from 'semantic-ui-react'


class LoginForm extends Component {
    state = {
      value: ''
    }
    onChange = (e, { value }) => {
      this.setState({ value })
    }
    handleSubmit = e => {
      e.preventDefault()
      const { onLoading, setAuthUser } = this.props
      const authUser = this.state.value
  
      new Promise((res, rej) => {
        onLoading()
        setTimeout(() => res(), 500)
      }).then(() => setAuthUser(authUser))
    }
    loginData = () => {
      const { users } = this.props
  
      return users.map(user => ({
        key: user.id,
        text: user.name,
        value: user.id,
        image: { avatar: true, src: user.avatarURL }
      }))
    }
    render() {
      const { value } = this.state
      const disabled = value === '' ? true : false
  
      return (
        <Form onSubmit={this.handleSubmit}>
          <Header as="h2" color="green">
            Sign In
          </Header>
          <span>        
            <Dropdown        
              placeholder='Select a User'
              fluid
              search
              selection
              options={this.loginData()}
              value={value}
              onChange={this.onChange}
              required
            />
            <br />      
            <Button content="Login" positive disabled={disabled} fluid />
          </span>
        </Form>
      )
    }
  }

function mapStateToProps({ users }) {
    return {
      users: Object.values(users)
    }
  }

export default connect(mapStateToProps, { setAuthUser })(LoginForm)