import { Song } from "react-native-get-music-files/lib/typescript/src/NativeTurboSongs";
import SQLite from "react-native-sqlite-storage";
import { useGeneratorContext } from "./Generators/GeneratorProvider";
import { DatabaseLogger } from "../Settings/ScreenSettings";
import { useSynchronizerContext } from "./Synchronizers/SynchronizerProvider";

async function PopulateDatabase(db: SQLite.SQLiteDatabase, data: Song, logger: DatabaseLogger) {
    logger.pushLog("Processing " + data.title, "Information");

    const generators = useGeneratorContext();
    const synchronizers = useSynchronizerContext();

    const track = generators.trackGenerator.generate(data, logger);
    synchronizers.trackSynchronizer.synchronize(track, logger);
}

export {
    PopulateDatabase
}