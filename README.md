# ffmpeg-multistream - FFMPEG input multistream

## Usage

Multistream - constructor

```typescript
import Multistream from "ffmpeg-multistream";

const multistream = new Multistream(ReadableStream);
```

Multistream - get url

```typescript
console.log(multistream.url);
```

Multistream - release (When not using this multistream)

```typescript
multistream.release();
```

## Example

```typescript
import Multistream from "ffmpeg-multistream";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";

const videoMultistream = new Multistream(fs.createReadStream("test.mp4"));
const audioMultistream = new Multistream(fs.createReadStream("test.mp3"));

ffmpeg()
  .input(videoMultistream.url)
  .inputFormat("mp4")
  .input(audioMultistream.url)
  .inputFormat("mp3")
  .videoCodec("copy")
  .audioCodec("copy")
  .output("out2.mp4")
  .addOptions(["-map", "0:v", "-map", "1:a", "-y"])
  .on("end", () => {
    resolve();
  })
  .run();
```
