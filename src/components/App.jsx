import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import Leaderboard from './Leaderboard'
import Nav from './Nav'
import Login from './Login'
import Home from './Home'
import Question from './Question'
import NewQuestion from './NewQuestion'

class App extends Component {
  
  componentDidMount() {
    this.props.handleInitialData()
  }
  
  render() {
    const { authUser } = this.props

    const NoMatchPage = () => {
      return (
        <h3>404 - Not found</h3>
      )
    }
    return (
      <BrowserRouter>
        <div className="App">
          {authUser === null ? (
            <Route
              render={() => (
                <Grid padded='vertically' columns={1} centered>
                  <Grid.Row>
                    <Grid.Column style={{ maxWidth: 600 }}>
                      <Login />
                    </Grid.Column>
                  </Grid.Row>                  
                </Grid>
              )}
            />
          ) : (
            <Fragment>
              <Nav />
              <Grid padded="vertically" columns={1} centered>
                <Grid.Row>
                  <Grid.Column style={{ maxWidth: 600 }}>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/add" component={NewQuestion} />
                      <Route path="/questions/:questionId" component={Question} />
                      <Route path="/leaderboard" component={Leaderboard} />
                      <Route component={NoMatchPage} />
                    </Switch>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Fragment>
          )}
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  }
}

export default connect(mapStateToProps, { handleInitialData })(App)
