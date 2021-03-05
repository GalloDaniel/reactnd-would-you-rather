import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, Header, Image, Label, Divider } from 'semantic-ui-react'


export class Leaderboard extends Component {

  render() {    
    const color = ['yellow', 'grey', 'orange']
    const { users } = this.props

    const lData  = Object.values(users).map(user => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answeredQuestions: Object.values(user.answers).length,
      createdQuestions: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length
       }))
      .sort((a, b) => a.total - b.total)
      .reverse()
      .slice(0, 3)   

    return (
      <div>
        {lData.map((user, id) => (
          <Segment.Group key={user.id}>
            <Label corner="left" icon="trophy" color={color[id]} />
            <Grid divided padded>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Image src={user.avatarURL} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header as="h3" textAlign="left">
                    {user.name}
                  </Header>
                  <Grid>
                    <Grid.Column width={12}>Answered questions</Grid.Column>
                    <Grid.Column width={4}>{user.answeredQuestions}</Grid.Column>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Grid.Column width={12}>Created questions</Grid.Column>
                    <Grid.Column width={4}>{user.createdQuestions}</Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={4} textAlign="center">
                  <Segment.Group>
                    <Header as="h4" block attached="top" content="Score" />
                    <Segment>
                      <Label circular color="green" size="big">
                        {user.createdQuestions + user.answeredQuestions}
                      </Label>
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment.Group>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)
