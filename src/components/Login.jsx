import React, { Component, Fragment } from 'react'
import { Segment, Grid, Header, Loader, Dimmer } from 'semantic-ui-react'
import LoginForm from './LoginForm'

export class Login extends Component {
  state = {
    loading: false
  }
  handleLoading = () => {
    this.setState({ loading: true })
  }

  render() {
    return (
      <Fragment>
        <Segment.Group>
          <Header as="h3" block attached="top" textAlign="center">
            <Header.Content>Welcome to the Would You Rather App!</Header.Content>
            <Header.Subheader>Please sign in to continue</Header.Subheader>
          </Header>
          <LoginGridLayout
            form={<LoginForm onLoading={this.handleLoading} />}
            loading={this.state.loading}
          />
        </Segment.Group>        
      </Fragment>
    )
  }
}

const LoginGridLayout = ({ form, loading }) => (
  <div>
    <Grid padded textAlign="center">
      <Grid.Row className="login">
        <Grid.Column width={16}>
          {loading === true && (
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          )}          
          {form}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

export default Login
