"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
class Multistream {
    constructor(stream) {
        this.url = "";
        this.port = Multistream.globalPort;
        this.socketServer = net_1.default.createServer((socket) => {
            stream.on("end", () => {
                socket.end();
                this.release();
            });
            stream.pipe(socket);
        });
        const listen = () => {
            this.port = Multistream.globalPort++;
            this.socketServer.listen(this.port);
            this.url = `tcp://127.0.0.1:${this.port}`;
        };
        do {
            try {
                listen();
                break;
            }
            catch (err) { }
        } while (true);
    }
    release() {
        this.socketServer.unref();
    }
}
Multistream.globalPort = 2500;
exports.default = Multistream;
