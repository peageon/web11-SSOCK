import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { payload } from './auth.service';

@ApiTags('Oauth API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google')
  @ApiOperation({
    summary: 'Google 로그인 요청 API',
    description: 'Google OAuth API에 로그인 요청을 보냅니다.'
  })
  @ApiResponse({
    status: 200,
    description: `'https://mysnowball.kr/auth/google/redirect'로 GET요청을 보냅니다.`
  })
  @ApiResponse({
    status: 400,
    description: `'https://mysnowball.kr/auth/google/failure'로 GET요청을 보냅니다.`
  })
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<void> {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({
    status: 200,
    description: 'Google 로그인 성공'
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async googleLoginCallback(@Req() req: any, @Res() res: any): Promise<void> {
    const payload: payload = await this.authService.getUserInfo(req.user);
    const { accessToken, refreshToken } =
      await this.authService.generateJwtToken(payload);
    await this.authService.saveRefreshToken(payload, refreshToken);
    this.authService.setCookies(res, accessToken, refreshToken);
    res.redirect(`${process.env.OAUTH_REDIRECT_URL}`);
  }

  @Get('naver')
  @ApiOperation({
    summary: 'Naver 로그인 요청 API',
    description: 'Naver OAuth API에 로그인 요청을 보냅니다.'
  })
  @ApiResponse({
    status: 200,
    description: `'https://mysnowball.kr/auth/naver/redirect'로 GET요청을 보냅니다.`
  })
  @ApiResponse({
    status: 400,
    description: `'https://mysnowball.kr/auth/naver/failure'로 GET요청을 보냅니다.`
  })
  @UseGuards(AuthGuard('naver'))
  async naverLogin(): Promise<void> {}

  @Get('naver/redirect')
  @UseGuards(AuthGuard('naver'))
  @ApiResponse({
    status: 200,
    description: 'Naver 로그인 성공'
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async naverLoginCallBack(@Req() req: any, @Res() res: any): Promise<void> {
    const payload: payload = await this.authService.getUserInfo(req.user);
    const { accessToken, refreshToken } =
      await this.authService.generateJwtToken(payload);
    await this.authService.saveRefreshToken(payload, refreshToken);
    this.authService.setCookies(res, accessToken, refreshToken);
    res.redirect(`${process.env.OAUTH_REDIRECT_URL}`);
  }

  @Get('kakao')
  @ApiOperation({
    summary: 'Kakao 로그인 요청 API',
    description: 'Kakao OAuth API에 로그인 요청을 보냅니다.'
  })
  @ApiResponse({
    status: 200,
    description: `'https://mysnowball.kr/auth/kakao/redirect'로 GET요청을 보냅니다.`
  })
  @ApiResponse({
    status: 400,
    description: `'https://mysnowball.kr/auth/kakao/failure'로 GET요청을 보냅니다.`
  })
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(): Promise<void> {}

  @Get('kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  @ApiResponse({
    status: 200,
    description: 'Kakao 로그인 성공'
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async kakaoLoginCallBack(@Req() req: any, @Res() res: any): Promise<void> {
    const payload: payload = await this.authService.getUserInfo(req.user);
    // To DO: refresh token db에 저장 & 클라이언트에는 index만 저장?
    const { accessToken, refreshToken } =
      await this.authService.generateJwtToken(payload);
    await this.authService.saveRefreshToken(payload, refreshToken);
    this.authService.setCookies(res, accessToken, refreshToken);
    res.redirect(`${process.env.OAUTH_REDIRECT_URL}`);
  }

  @Get('test')
  @ApiResponse({
    status: 200,
    description: '로그인 성공'
  })
  async test(@Req() req: any, @Res() res: any): Promise<void> {
    const payload: payload = {
      id: 3,
      name: '김부캠',
      auth_id: '105101728749763412428'
    };
    // To DO: refresh token db에 저장 & 클라이언트에는 index만 저장?
    const { accessToken, refreshToken } =
      await this.authService.generateJwtToken(payload);
    await this.authService.saveRefreshToken(payload, refreshToken);
    this.authService.setCookies(res, accessToken, refreshToken);
    res.redirect(`${process.env.OAUTH_REDIRECT_URL}`);
  }

  @Get('logout')
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공'
  })
  async logout(@Res() res: any): Promise<void> {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.redirect(`/`);
  }
}
