import { Request, Response } from 'express';
export declare const getSettings: (_: Request, res: Response) => Promise<void>;
export declare const sendSettings: (req: Request, res: Response) => Promise<void>;
export declare const deleteSettings: (_: Request, res: Response) => Promise<void>;
