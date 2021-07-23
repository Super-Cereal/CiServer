/// <reference types="node" />
declare type ExecType = (command: string) => Promise<void | {
    stdout: string;
    stderr: string;
}>;
declare type ReadFileType = (path: string) => Promise<string>;
declare type WriteFileType = (path: string, content: string | NodeJS.ArrayBufferView) => Promise<void>;
declare type DeleteDirType = (path: string) => Promise<void>;
declare type ExistsType = (path: string) => Promise<boolean>;
declare type WriteConfigRepoDataType = (repoName: string, mainBranch: string, buildCommand: string) => Promise<void>;
export declare const exec: ExecType;
export declare const readFile: ReadFileType;
export declare const writeFile: WriteFileType;
export declare const deleteDir: DeleteDirType;
export declare const exists: ExistsType;
export declare const getConfigRepoData: () => Promise<string[]>;
export declare const writeConfigRepoData: WriteConfigRepoDataType;
declare const fsUtils: {
    exec: ExecType;
    readFile: ReadFileType;
    writeFile: WriteFileType;
    deleteDir: DeleteDirType;
    exists: ExistsType;
    getConfigRepoData: () => Promise<string[]>;
    writeConfigRepoData: WriteConfigRepoDataType;
};
export default fsUtils;
