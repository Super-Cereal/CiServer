declare const buildProcess: () => Promise<{
    status: number;
    data: any;
}>;
export default buildProcess;
