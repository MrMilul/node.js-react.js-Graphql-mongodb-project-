import { gql } from 'apollo-boost'

const getLessonQuery = gql`
{
    lessons{
      lesson
      id    
    }
  }
`

export { getLessonQuery }