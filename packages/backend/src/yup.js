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
    .required(),
  resume: array().required()
});

let singleIdSchema = object().shape({
  id: string().required().matches('/^[0-9a-fA-F]{24}$/')
});

let boardSchema = array()
  .of(string().oneOf(['X', 'O', ' ']))
  .min(9)
  .max(9)
  .required();

export { gameSchema, singleIdSchema, boardSchema };
