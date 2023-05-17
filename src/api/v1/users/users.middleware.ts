import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IsAuthorizedMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) { }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    use(req: Request, res: Response, next: NextFunction) {
        const token = this.extractTokenFromHeader(req);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = this.jwtService.verify(token, { secret: process.env.SECRET });
            const { userId } = req.params;
            if (payload.sub !== parseInt(userId) || !payload.sub || !parseInt(userId)) {
                throw new UnauthorizedException();
            }
        } catch {
            throw new UnauthorizedException();
        }
        next();
    }
}