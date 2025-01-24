import { Song } from "react-native-get-music-files/lib/typescript/src/NativeTurboSongs";
import { DatabaseLogger } from "../../Settings/ScreenSettings";
import { TrackData } from "../Schema";

const RGX_directoryTrackTitle = new RegExp(/(?<=[\\/])[^\\/]*(?=\.[a-zA-Z]+)/);
const RGX_fileTrackTitle = new RegExp(/(?<=- [0-9][0-9] )[^\\/]*(?=\.[a-zA-Z]+)/);

export interface TrackGenerator {
    generate(data: Song, logger: DatabaseLogger): TrackData
};

function generate(data: Song, logger: DatabaseLogger) {
    var finalTitle : string | undefined = data.title;
    finalTitle ??= RGX_directoryTrackTitle.exec(data.url)?.[0];
    finalTitle ??= RGX_fileTrackTitle.exec(data.url)?.[0];
    
    if(data.title !== finalTitle) {
        logger.pushLog(`Title metadata did not exist on file \"${data.url}\" and was replaced with path-based name: \"${finalTitle}\"`, "Warning");
    }

    const track : TrackData = {
        trackID: null,
        title: data.title,
        duration: data.duration,
        filePath: data.url,
        volume: 0,
        linkedTrackPlaylistID: null,
        rating: null,
        lastModifiedDate: null,
        generatedDate: new Date(Date.now())
    };

    return track;
}

export const TrackGenerator: TrackGenerator = {
    generate
}