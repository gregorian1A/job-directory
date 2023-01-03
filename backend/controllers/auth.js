import {User} from '../models/auth.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body;

    try {
        const existingUser = await User.findOne({email});
    
        if(existingUser) {
            console.log('Email already exists');
            return res.status(400).json({message: 'Email already exists'});
        }
    
        if(password !== confirmPassword) {
            console.log('Passwords do not match')
            return res.status(400).json({message: 'Password do not match'});
        }
    
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const result = await User.create({
            name: `${firstName}`,
            password: hashedPassword,
            email
        });

        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1hr'});

        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
      const isExistinguser = await User.findOne({email});
      
      if(!isExistinguser) {
        console.log('Email not found');
        return res.status(400).json({message: 'Email does not exist'});
      }

      const isPasswordCorrect = await bcrypt.compare(password, isExistinguser.password);
      
      if(!isPasswordCorrect) {
        console.log('Credentials do not match');
        return res.status(400).json({message: 'Credentials do not match'});
      }

      const token = jwt.sign({email: isExistinguser.email, id: isExistinguser._id}, 'test', {expiresIn: '1hr'});

      res.status(200).json({result: isExistinguser, token});

    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}