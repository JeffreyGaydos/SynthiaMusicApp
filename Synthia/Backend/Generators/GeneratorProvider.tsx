import React from "react";
import { TrackGenerator } from "./TrackGenerator";

export interface Generators {
    trackGenerator: TrackGenerator
}

const allGenerators: Generators = {
    trackGenerator: TrackGenerator
}

const GeneratorContext = React.createContext<Generators | undefined>(undefined);

function GeneratorProvider({ children }: { children: React.JSX.Element }) {
    return (
        <GeneratorContext.Provider value={allGenerators}>
            { children }
        </GeneratorContext.Provider>
    );
}

function useGeneratorContext() {
    const context = React.useContext(GeneratorContext);
    if(!context) {
        throw new Error("useGeneratorContext must be used as a child of a GeneratorProvider component");
    }
    return context;
}

export {GeneratorProvider, useGeneratorContext}