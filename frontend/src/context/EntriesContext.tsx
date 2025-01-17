import { createContext, FC, PropsWithChildren } from 'react';

export type EntriesContextType = {
    message: string
}
export const EntriesContext = createContext<EntriesContextType | null>(null);

const EntriesProvider: FC<PropsWithChildren> = ({children}) => {
    const message = "hello";
    return (
        <EntriesContext.Provider value={{message}}>
            {children}
        </EntriesContext.Provider>
    )
}

export default EntriesProvider;