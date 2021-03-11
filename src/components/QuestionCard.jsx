import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Header, Button, Grid, Image, SegmentGroup} from 'semantic-ui-react'

export class QuestionCard extends Component {
  state = {
    viewCard: false
  }
  handleClick = e => {
    this.setState(prevState => ({
      viewCard: !prevState.viewCard
    }))
  }
  render() {
    const { question, unanswered, author } = this.props
    const buttonColor = unanswered === true ? 'green' : 'blue'
    const buttonContent = unanswered === true ? 'Answer Question' : 'Results'

    if (this.state.viewCard === true) {
      return <Redirect push to={`/questions/${question.id}`} />
    }
    return (
      <SegmentGroup>
        <Header
          as="h5"
          textAlign="left"
          block
          attached="top"          
        >
          {author.name} asks:
        </Header>

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={author.avatarURL} />
            </Grid.Column>
            <Grid.Column width={11}>
              <Fragment>
                <Header as="h5" textAlign="left">
                  Would you rather
                </Header>
                <p style={{ textAlign: 'center' }}>
                  {question.optionOne.text}
                  <br />
                  or
                  <br />
                  {question.optionTwo.text}
                </p>
                <Button
                  color={buttonColor}
                  size="tiny"
                  fluid
                  onClick={this.handleClick}
                  content={buttonContent}
                />             
              </Fragment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </SegmentGroup>
    )
  }
}

function mapStateToProps ({ users, questions }, { questionId }) {
  let question = questions[questionId]
  let author = users[question.author]
  return {
    author,
    question,
  }
}
export default connect(mapStateToProps)(QuestionCard)
