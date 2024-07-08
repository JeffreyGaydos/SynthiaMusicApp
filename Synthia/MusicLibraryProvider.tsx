import React from "react";
import { MusicLibrary, SQLiteMusicLibrary } from "./MusicLibrary";

const MusicLibraryContext = React.createContext<MusicLibrary | undefined>(undefined);

function MusicLibraryProvider({ children }: { children: React.JSX.Element }) {
    return (
        <MusicLibraryContext.Provider value={SQLiteMusicLibrary}>
            { children }
        </MusicLibraryContext.Provider>
    );
}

function useMusicLibrary() {
    const context = React.useContext(MusicLibraryContext);
    if(!context) {
        throw new Error("useMusicLibrary must be used as a child of a MusicLibraryProvider component");
    }
    return context;
}

export {MusicLibraryProvider, useMusicLibrary}