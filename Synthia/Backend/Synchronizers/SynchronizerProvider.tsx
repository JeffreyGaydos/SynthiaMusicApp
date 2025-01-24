import React from "react";
import { TrackSynchronizer } from "./TrackSynchronizer";

export interface Synchronizers {
    trackSynchronizer: TrackSynchronizer
}

const allSynchronizers: Synchronizers = {
    trackSynchronizer: TrackSynchronizer
}

const SynchronizerContext = React.createContext<Synchronizers | undefined>(undefined);

function SynchronizerProvider({ children }: { children: React.JSX.Element }) {
    return (
        <SynchronizerContext.Provider value={allSynchronizers}>
            { children }
        </SynchronizerContext.Provider>
    );
}

function useSynchronizerContext() {
    const context = React.useContext(SynchronizerContext);
    if(!context) {
        throw new Error("useSynchronizerContext must be used as a child of a SynchronizerProvider component");
    }
    return context;
}

export {SynchronizerProvider, useSynchronizerContext}