import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'modules/users/users.service';
import { UserDto, RefreshTokenDto } from './dto/auth.dto';
import { UserDocument } from 'models/user/user.schema';
import { SessionService } from 'modules/session/session.service';
import { SessionDocument } from 'models/session/session.schema';
import { AuthTokens } from 'interfaces/auth.types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private sessionService: SessionService,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: UserDto): Promise<AuthTokens> {
    try {
      const existedUser: UserDocument = await this.usersService.findOne(
        userDto.username,
      );

      if (existedUser) {
        throw new BadRequestException('user already exists');
      }
      userDto.password = await bcrypt.hash(userDto.password, 10);
      const newUser: UserDocument = await this.usersService.create(userDto);
      const payload = await Promise.all<
        [Promise<string>, Promise<SessionDocument>]
      >([this.generateToken(newUser), this.sessionService.create(newUser)]);

      return {
        accessToken: payload[0],
        refreshToken: payload[1].refreshToken,
      };
    } catch (e) {
      this.logger.error(e.message);

      if (e instanceof BadRequestException) {
        throw e;
      }
    }
  }

  async signIn(signInDto: UserDto): Promise<AuthTokens> {
    const { username, password } = signInDto;
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException(`user isn't exist`);
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new UnauthorizedException();
    }

    const payload = await Promise.all<
      [Promise<string>, Promise<SessionDocument>]
    >([this.generateToken(user), this.sessionService.create(user)]);

    return {
      accessToken: payload[0],
      refreshToken: payload[1].refreshToken,
    };
  }

  async refreshToken({ refreshToken }: RefreshTokenDto): Promise<AuthTokens> {
    const existedSession = await this.sessionService.find(refreshToken);

    if (!existedSession) {
      throw new UnauthorizedException();
    }
    const accessToken = await this.generateToken(existedSession.user);

    return {
      accessToken,
      refreshToken: existedSession.refreshToken,
    };
  }

  async generateToken(user: UserDocument) {
    const payload = { username: user.username };
    return this.jwtService.sign(payload);
  }
}
