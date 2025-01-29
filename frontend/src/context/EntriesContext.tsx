import { createContext, FC, PropsWithChildren } from 'react';

export type EntriesContextType = {
    addEntrie: (formData: any) => void
}
export const EntriesContext = createContext<EntriesContextType | null>(null);

const EntriesProvider: FC<PropsWithChildren> = ({children}) => {
    const addEntrie = (formData:any) => {
        console.log(formData);
    };
    return (
        <EntriesContext.Provider value={{
            addEntrie
        }}>
            {children}
        </EntriesContext.Provider>
    )
}

export default EntriesProvider;