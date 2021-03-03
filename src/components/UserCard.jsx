import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Segment, Header, Grid, Image } from 'semantic-ui-react'
import Question from './Question'
import QuestionResult from './QuestionResult'
import QuestionCard from './QuestionCard'
import { colors } from '../utils/helpers'

const pollTypes = {
  QUESTION_CARD: 'QUESTION_CARD',
  QUESTION: 'QUESTION',
  QUESTION_RESULT: 'QUESTION_RESULT'
}

const PollContent = props => {
  const { pollType, question, unanswered } = props

  switch (pollType) {
    case pollTypes.QUESTION_CARD:
      return <QuestionCard question={question} unanswered={unanswered} />
    case pollTypes.QUESTION:
      return <Question question={question} />
    case pollTypes.QUESTION_RESULT:
      return <QuestionResult question={question} />
    default:
      return
  }
}

export class UserCard extends Component {
  static propTypes = {
    question: PropTypes.object,
    author: PropTypes.object,
    pollType: PropTypes.string,
    unanswered: PropTypes.bool,
    question_id: PropTypes.string
  }
  render() {
    const {
      author,
      question,
      pollType,
      badPath,
      unanswered = null
    } = this.props

    if (badPath === true) {
      return <Redirect to="/questions/bad_id" />
    }

    const tabColor = unanswered === true ? colors.green : colors.blue
    const borderTop =
      unanswered === null
        ? `1px solid ${colors.grey}`
        : `2px solid ${tabColor.hex}`

    return (
      <Segment.Group>
        <Header
          as="h5"
          textAlign="left"
          block
          attached="top"
          style={{ borderTop: borderTop }}
        >
          {author.name} asks:
        </Header>

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={author.avatarURL} />
            </Grid.Column>
            <Grid.Column width={11}>
              <PollContent
                pollType={pollType}
                question={question}
                unanswered={unanswered}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    )
  }
}

function mapStateToProps(
  { users, questions, authUser },
  { match, question_id }
) {
  let question,
    author,
    pollType,
    badPath = false
  if (question_id !== undefined) {
    question = questions[question_id]
    author = users[question.author]
    pollType = pollTypes.QUESTION_CARD
  } else {
    const { question_id } = match.params
    question = questions[question_id]
    const user = users[authUser]

    if (question === undefined) {
      badPath = true
    } else {
      author = users[question.author]
      pollType = pollTypes.QUESTION
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = pollTypes.QUESTION_RESULT
      }
    }
  }

  return {
    badPath,
    question,
    author,
    pollType
  }
}

export default connect(mapStateToProps)(UserCard)
