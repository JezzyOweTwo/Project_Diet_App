import User from '../../schemas/user';
import type { IUser } from '../../schemas/user';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function registerUser(email: string, password: string, name: string): Promise<IUser> {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    
    const user = new User({ email, password, name });
    await user.save();
    return user;
}

export async function loginUser(email: string, password: string): Promise<string> {
    const user = await User.findByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }
    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
    return token;
}