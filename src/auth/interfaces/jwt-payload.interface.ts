export interface JwtPayload {
  sub: number;
  email: string;
  iss: string;
  aud: string;
  expo: number;
}
