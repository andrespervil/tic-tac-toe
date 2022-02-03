import { object, string, array, ref } from 'yup';

let gameSchema = object({
  user1: string().required(),
  user2: string().required(),
  winner: string()
    .required()
    .oneOf(
      [ref('user1'), ref('user2')],
      'This players have not played the match!'
    )
    .required('Required'),
  resume: array().required()
});

export { gameSchema };
