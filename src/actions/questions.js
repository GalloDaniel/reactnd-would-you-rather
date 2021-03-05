import { saveQuestion } from '../utils/api'
import { addQuestionToUser } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER_QUESTION = 'ADD_ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function addAnswerQuestion(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_QUESTION,
    authUser,
    qid,
    answer
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {

    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(addQuestion(question))
        dispatch(addQuestionToUser(question))
      }
    )
  }
}
