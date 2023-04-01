import net from "net";
import { Readable } from "stream";

class Multistream {
  url: string;
  private socketServer: net.Server;
  private port: number;

  static globalPort: number = 2500;

  constructor(stream: Readable) {
    this.url = "";
    this.port = Multistream.globalPort;

    this.socketServer = net.createServer((socket) => {
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
      } catch (err) {}
    } while (true);
  }

  release() {
    this.socketServer.unref();
  }
}
export default Multistream;
