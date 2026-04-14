declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      nome: string;
      sobrenome: string;
      role: string;
    };
  }
}
