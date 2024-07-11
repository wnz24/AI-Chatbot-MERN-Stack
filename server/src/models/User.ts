import mongoose, { CallbackError, Document,Model, Schema } from 'mongoose';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

// Interface for the chat schema
interface IChat {
  id: string;
  roles: string;
  content: string;
}

// Interface for the user schema
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  chats: IChat[];
  comparePassword(password: string): Promise<boolean>;
}

// Define chat schema
const chatSchema = new Schema<IChat>({
  id: {
    type: String,
    default: randomUUID,
  },
  roles: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Define user schema
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema],
});

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
  next(error as CallbackError)
  }
});

// Add comparePassword method to userSchema
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const user = this as IUser;
  return bcrypt.compare(password, user.password);
};

// Create and export the User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
