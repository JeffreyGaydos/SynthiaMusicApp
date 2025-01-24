import { Song } from "react-native-get-music-files/lib/typescript/src/NativeTurboSongs";
import { DatabaseLogger } from "../../Settings/ScreenSettings";
import { TrackData } from "../Schema";
import { readDir } from "react-native-fs";

const RGX_directoryTrackTitle = new RegExp(/(?<=[\\/])[^\\/]*(?=\.[a-zA-Z]+)/);
const RGX_fileTrackTitle = new RegExp(/(?<=- [0-9][0-9] )[^\\/]*(?=\.[a-zA-Z]+)/);
const RGX_fileName = new RegExp(/(?<=[\\/])[^\\/]+$/); //does not include prefixed slash
const RGX_fileDirectory = new RegExp(/.*(?=[\\/][^\\/]+$)/); //does not include trailing slash

export interface TrackGenerator {
    generate(data: Song, logger: DatabaseLogger): Promise<TrackData>
};

async function generate(data: Song, logger: DatabaseLogger): Promise<TrackData> {
    var finalTitle : string | undefined = data.title;
    finalTitle ??= RGX_directoryTrackTitle.exec(data.url)?.[0];
    finalTitle ??= RGX_fileTrackTitle.exec(data.url)?.[0];
    
    if(data.title !== finalTitle) {
        logger.pushLog(`Title metadata did not exist on file \"${data.url}\" and was replaced with path-based name: \"${finalTitle}\"`, "Warning");
    }

    var modifiedDate: Date | null = null;
    try {
        const fileName = RGX_fileName.exec(data.url)![0];
        const directory = RGX_fileDirectory.exec(data.url)![0];
        const dirResult = await readDir(directory);
        const currentFile = dirResult.filter(f => f.name == fileName)[0];
        modifiedDate = currentFile.mtime ?? null;
        modifiedDate?.setMilliseconds(0); //SQLite Date objects don't have milliseconds
    } catch (e) {
        logger.pushLog(`Could not read modified date of "${data.url}"`, "Warning");
    }

    const track : TrackData = {
        trackID: null,
        title: data.title,
        duration: data.duration,
        filePath: data.url,
        volume: 0,
        linkedTrackPlaylistID: null,
        rating: null,
        lastModifiedDate: modifiedDate,
        generatedDate: new Date(Date.now())
    };

    return track;
}

export const TrackGenerator: TrackGenerator = {
    generate
}