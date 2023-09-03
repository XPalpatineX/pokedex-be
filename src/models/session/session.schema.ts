import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';
import { UserDocument } from 'models/user/user.schema';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop({ type: MSchema.Types.ObjectId, ref: 'User' })
  user: UserDocument;

  @Prop({ required: true })
  refreshToken: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
