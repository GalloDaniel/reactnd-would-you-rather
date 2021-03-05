import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Image, Grid, Button, Container, Icon} from 'semantic-ui-react'
import { setAuthUser } from '../actions/authUser'

class Nav extends Component {
  handleLogout = e => {
    e.preventDefault()
    this.props.setAuthUser(null)
  }

  render() {
    const { authUser, users } = this.props

    return (
      <Container>
        <Fragment>
          <Grid columns={1} padded="vertically">
            <Grid.Row>
              <Grid.Column textAlign="right">
                <Image
                  src={users[authUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {`${users[authUser].name}  `}
                <Button animated onClick={this.handleLogout}>
                  <Button.Content visible>Logout</Button.Content>
                  <Button.Content hidden>
                  <Icon name='log out' />
                  </Button.Content>                
                </Button>
              </Grid.Column>
            </Grid.Row>          
            <Grid.Row>
              <Grid.Column width={16}>
                <Menu pointing secondary widths={3}>
                  <Menu.Item name="home" as={NavLink} to="/" exact />
                  <Menu.Item name="new question" as={NavLink} to="/add" />
                  <Menu.Item
                    name="leader board"
                    as={NavLink}
                    to="/leaderboard"
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Fragment> 
      </Container>
    )
  }
}

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users
  }
}

export default connect(
  mapStateToProps,
  { setAuthUser }
)(Nav)
