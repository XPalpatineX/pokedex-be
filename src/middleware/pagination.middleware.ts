import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { EDefaultPagination, ReqPagination } from 'interfaces/pagination';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestQuery = req.query;
    const pagination: ReqPagination = {
      limit: requestQuery?.limit
        ? Number(requestQuery.limit)
        : EDefaultPagination.limit,
      page: requestQuery?.page
        ? Number(requestQuery.page)
        : EDefaultPagination.page,
    };

    req['pagination'] = pagination;
    next();
  }
}
