import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UserDocument, User } from 'models/user/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(payload): Promise<UserDocument> {
    return this.userModel.create(payload);
  }

  async findOne(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username });
  }
}
