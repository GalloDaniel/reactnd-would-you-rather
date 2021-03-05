import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header, Segment, Progress, Label, Button, Icon, Grid, Image } from 'semantic-ui-react'

const UserVoteLabel = () => (
  <Label color="orange" ribbon="right" className="vote">
    <Icon name="check circle outline" size="big" className="compact" />
    <div style={{ float: 'right' }}>
      Your
      <br />
      Vote
    </div>
  </Label>
)

export class QuestionResult extends Component {
  state = {
    back: false
  }
  
  handleClick = e => {
    this.setState(prevState => ({
      back: !prevState.back
    }))
  }

  render() {

    if (this.state.back === true) {
      return <Redirect push to={`/`} />
    }

    const { question, users, author, authUser } = this.props
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const votesTotal = optionOneVotes + optionTwoVotes
    const userVote = users[authUser].answers[question.id]
    
    

    const styles = {
      primary: {
        color: 'green',
        bgColor: 'honeydew'
      },
      secondary: {
        color: 'grey',
        bgColor: '#f4f4f4'
      }
    }

    let option1 = styles.secondary,
      option2 = styles.secondary
    if (optionOneVotes > optionTwoVotes) {
      option1 = styles.primary
    } else if (optionTwoVotes > optionOneVotes) {
      option2 = styles.primary
    }

    return (
        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={author.avatarURL} />
            </Grid.Column>
            <Grid.Column width={11}>
              <Fragment>
                <Header as="h3">
                  Results:
                  <Header.Subheader style={{ fontWeight: 'bold' }}>
                    Would you rather
                  </Header.Subheader>
                </Header>
                <Segment
                    color={option1.color}
                    style={{ backgroundColor: `${option1.bgColor}` }}
                >
                  {userVote === 'optionOne' && <UserVoteLabel />}
                  <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
                  <Progress
                    percent={((optionOneVotes / votesTotal) * 100).toFixed(2)}
                    progress
                    color={option1.color}
                  >
                    {optionOneVotes} out of {votesTotal} votes
                  </Progress>
                </Segment>
                <Segment
                  color={option2.color}
                  style={{ backgroundColor: `${option2.bgColor}` }}
                >
                  {userVote === 'optionTwo' && <UserVoteLabel />}

                  <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
                  <Progress
                    percent={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
                    progress
                    color={option2.color}
                  >
                    {optionTwoVotes} out of {votesTotal} votes
                  </Progress>
                </Segment>
                <Button size="tiny" floated="right" onClick={this.handleClick}>
                  Back
                </Button>
              </Fragment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}

function mapStateToProps({ users }){    
  
  return {   
    users,
  }    
}

export default withRouter(connect(mapStateToProps)(QuestionResult))
