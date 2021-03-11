import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Button, Form, Radio, SegmentGroup, Grid, Image } from 'semantic-ui-react'
import { handleSaveAnswer } from '../actions/users'
import { QuestionResult } from './QuestionResult'

export class Question extends Component {
  
  state = {
    value: ''
  }

  handleChange = (e, { value }) => this.setState({ value })

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.value !== '') {
      const { authUser, question, handleSaveAnswer } = this.props
      handleSaveAnswer(authUser, question.id, this.state.value)
    }
  }

  render() {
    const { question, author, ansewedQuestion, authUser, users } = this.props
    const disabled = this.state.value === '' ? true : false 
    
    if (question === undefined) {
      return <h3>404 - Not found</h3>
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
        {ansewedQuestion === true
          ? <QuestionResult 
              question={question}
              author={author}
              authUser={authUser}
              users={users}/>
          : <Grid divided padded>
              <Grid.Row>
                <Grid.Column width={5}>
                  <Image src={author.avatarURL} />
                </Grid.Column>
                <Grid.Column width={11}>            
                  <Header as="h4">Would you rather</Header>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                      <Radio
                        label={question.optionOne.text}
                        name="radioGroup"
                        value="optionOne"
                        checked={this.state.value === 'optionOne'}
                        onChange={this.handleChange}
                      />
                      <br />
                      <Radio
                        label={question.optionTwo.text}
                        name="radioGroup"
                        value="optionTwo"
                        checked={this.state.value === 'optionTwo'}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Button
                        color="green"
                        size="tiny"
                        fluid
                        positive
                        disabled={disabled}
                        content="Submit"
                      />
                    </Form.Field>
                  </Form>            
                </Grid.Column>
              </Grid.Row>
            </Grid>}
      </SegmentGroup>
    )
  }
}

function mapStateToProps({ authUser, questions, users }, { match }) {
  const { questionId } = match.params
  const question = questions[questionId] ? questions[questionId] : undefined

  if (question === undefined) {
    return question 
  }  

  const author = users[questions[questionId].author]
  const user = users[authUser]
  let ansewedQuestion = false

  if (Object.keys(user.answers).includes(questionId)) {
    ansewedQuestion = true
  } 

  return {
    authUser,
    question,
    author,
    ansewedQuestion,
    users,
  }
}

export default connect(mapStateToProps,{ handleSaveAnswer })(Question)