import { Request, Response } from 'express';
export declare const getAllBuilds: (req: Request, res: Response) => Promise<void>;
export declare const getBuildDetails: (req: Request, res: Response) => Promise<void>;
export declare const getBuildLogs: (req: Request, res: Response) => Promise<void>;
export declare const addNewBuild: (req: Request, res: Response) => Promise<void>;
