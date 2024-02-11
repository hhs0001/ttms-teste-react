const rest = require('msw');

export const handlers = [
  rest.post('http://localhost:3001/api/login', (req, res, ctx) => {
    const { email, senha } = req.body;
    
    if (email === 'test@example.com' && senha === 'password') {
      return res(
        ctx.status(200),
        ctx.json({ token: 'fakeToken', email: email })
      );
    } else {
      return res(
        ctx.status(403),
        ctx.json({ message: 'E-mail ou senha inválidos.' })
      );
    }
  }),
];
