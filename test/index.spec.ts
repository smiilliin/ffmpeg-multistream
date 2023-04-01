import Multistream from "../src/multistream";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import assert from "assert";
import { spawn } from "child_process";

describe("FFMPEG Multistream", () => {
  it("Spawn FFMPEG - Merge video and audio", async () => {
    await new Promise<void>((resolve) => {
      const videoMultistream = new Multistream(fs.createReadStream("test/test.mp4"));
      const audioMultistream = new Multistream(fs.createReadStream("test/test.mp3"));

      const ffmpegArgs = [
        "-y",
        "-f",
        "mp4",
        "-i",
        videoMultistream.url,
        "-f",
        "mp3",
        "-i",
        audioMultistream.url,
        "-c:v",
        "copy",
        "-c:a",
        "copy",
        "-map",
        "0:v",
        "-map",
        "1:a",
        "test/out.mp4",
      ];
      const ffmpegProcess = spawn("ffmpeg", ffmpegArgs);

      ffmpegProcess.on("exit", (code) => {
        resolve();
      });
    });
    assert(fs.statSync("test/out.mp4"));
  });
  it("Fluent FFMPEG - Merge video and audio", async () => {
    await new Promise<void>((resolve) => {
      const videoMultistream = new Multistream(fs.createReadStream("test/test.mp4"));
      const audioMultistream = new Multistream(fs.createReadStream("test/test.mp3"));

      ffmpeg()
        .input(videoMultistream.url)
        .inputFormat("mp4")
        .input(audioMultistream.url)
        .inputFormat("mp3")
        .videoCodec("copy")
        .audioCodec("copy")
        .output("test/out2.mp4")
        .addOptions(["-map", "0:v", "-map", "1:a", "-y"])
        .on("end", () => {
          resolve();
        })
        .run();
    });
    assert(fs.statSync("test/out2.mp4"));
  });
});
