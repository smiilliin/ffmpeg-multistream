/// <reference types="node" />
import { Readable } from "stream";
declare class Multistream {
    url: string;
    private socketServer;
    private port;
    static globalPort: number;
    constructor(stream: Readable);
    release(): void;
}
export default Multistream;
