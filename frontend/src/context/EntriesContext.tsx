import { createContext, FC, PropsWithChildren, useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthContext, AuthContextType } from './AuthContext';

export type EntriesContextType = {
    addEntrie: (formData: any) => void,
    getEntries: () => any,
    entries: any
}
export const EntriesContext = createContext<EntriesContextType | null>(null);

const EntriesProvider: FC<PropsWithChildren> = ({children}) => {
    const addEntrie = async (formData:any) => {
        const data = axios.post("http://localhost:5000/api/addentrie", formData, {withCredentials: true});
        // console.log(data);
    };

    const {auth} = useContext(AuthContext) as AuthContextType;

    const [entries, setEntries] = useState([]);
    
    const getEntries = async () => {
        await axios.get(
            "http://localhost:5000/api/entries", 
            {withCredentials: true}
        ).then(response => {
            const entries = response.data;
            console.log(entries)
            setEntries(entries);
        }).catch(error => {
            console.log(error);
        });
    }

    // useEffect(() => {getEntries()},[]);
    useEffect(()=>{getEntries()},[auth]);

    return (
        <EntriesContext.Provider value={{
            addEntrie,
            getEntries,
            entries
        }}>
            {children}
        </EntriesContext.Provider>
    )
}

export default EntriesProvider;