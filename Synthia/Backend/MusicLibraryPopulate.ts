import { Song } from "react-native-get-music-files/lib/typescript/src/NativeTurboSongs";
import SQLite from "react-native-sqlite-storage";
import { DatabaseLogger } from "../Settings/ScreenSettings";
import { Generators } from "./Generators/Generators";
import { Synchronizers } from "./Synchronizers/Synchronizers";

const count: number = 0.0;

async function PopulateDatabase(db: SQLite.SQLiteDatabase, data: Song, logger: DatabaseLogger, totalCount: number) {
    const track = await Generators.TrackGenerator.generate(data, logger);
    const action = await Synchronizers.TrackSynchronizer.synchronize(db, track, logger);
    logger.pushLog(`'${data.title}' processed: '${action}' (${count / totalCount * 100.0}%)`, "Information");
}

export {
    PopulateDatabase
}