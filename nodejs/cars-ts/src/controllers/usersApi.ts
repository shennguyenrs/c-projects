import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { SERECT_KEY } from '../utils/config';
import User from '../interfaces/User';
import userModel from '../models/userModel';

// Login to account
export function login(req: Request, res: Response): void {
  const loginEmail = req.body.email;
  const loginPass = req.body.password;

  userModel
    .findOne({ email: loginEmail })
    .then((result: User) => {
      // If found the user in database
      if (result) {
        const hashpwd = result.password;
        // Create token for signed user
        const token = jwt.sign({ email: loginEmail }, SERECT_KEY as string);

        // Compare hash password and login password
        if (bcrypt.compareSync(loginPass, hashpwd)) {
          res.status(200).setHeader('Authorization', token);
        } else {
          res.status(400).send('Login password is incorrect');
        }
      }

      res.status(400).send('Not found email in the database');
    })
    .catch((err: Error) => console.log(err.stack));
}

// Sign up a new account
export async function signup(req: Request, res: Response): Promise<void> {
  const saltRounds = 10;
  const newEmail = req.body.email;

  // Crypting user password
  const newPass = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = new userModel({ email: newEmail, password: newPass });

  newUser
    .save()
    .then(() => res.status(201).send('Saved new user'))
    .catch((err: Error) => {
      res.status(500);
      console.log(err.stack);
    });
}

// User Authentication
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.header('Authorization');

  // End session if header do not contain token
  if (!token) res.status(400).end();

  // Verify received token
  jwt.verify(token as string, SERECT_KEY as string, (err, decoded) => {
    if (err) return res.status(400).end;
    next();
  });
}
