import jwt from 'jsonwebtoken';
import User from '../db/user.js';
const token = jwt.sign({ foo: 'bar' }, 'HugWolf', { expiresIn: 60 * 60 });

export default {
  hello: () => {
    return 'Hello world!';
  },
  authenticate: () => {
    return token;
  },
  userCreate: async ({input}) => {
    const user = await User.upsert(input);
    const { id, email } = user;
    return { id, email };
  },
};