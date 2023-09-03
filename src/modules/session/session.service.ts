import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';

import { Session, SessionDocument } from 'models/session/session.schema';
import { UserDocument } from 'models/user/user.schema';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async create(user: UserDocument): Promise<SessionDocument> {
    const refreshToken = uuid();
    return this.sessionModel.create({ user: user._id, refreshToken });
  }

  async find(refreshToken: string): Promise<SessionDocument> {
    return this.sessionModel.findOne({ refreshToken }).populate('user');
  }
}
