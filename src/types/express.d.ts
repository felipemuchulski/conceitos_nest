declare namespace Express {
  export interface Request {
    user?: {
      nome: string;
      sobrenome: string;
      role: string;
    };
  }
}
