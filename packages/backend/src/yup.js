import { object, string, array, ref } from 'yup';

let gameSchema = object({
  user1: string().required(),
  user2: string().required(),
  winner: string()
    .oneOf(
      [ref('user1'), ref('user2'), null],
      'The winner must be one of the two players'
    )
    .nullable()
});

let boardSchema = array()
  .of(string().oneOf(['X', 'O', ' ']))
  .min(9)
  .max(9)
  .required();

export { gameSchema, boardSchema };
