import { object, string } from 'yup';

let gameSchema = object({
  user1: string().required(),
  user2: string().required(),
  winner: string().required()
  //.when(['user1', 'user2', 'winner'], (user1, user2, winner, schema) => user1 === winner || user2=== winner})
});

export { gameSchema };
