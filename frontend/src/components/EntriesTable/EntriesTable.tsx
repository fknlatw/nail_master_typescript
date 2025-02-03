import axios from "axios";
import "./EntriesTable.scss";
import {useContext} from "react";
import { EntriesContext, EntriesContextType } from "../../context/EntriesContext";

const EntriesTable = () => {
    const {entries} = useContext(EntriesContext) as EntriesContextType;

  return (
    <table>
        <thead>
            <tr>
                <td>Дата и время</td>
                <td>Тип</td>
                <td>Имя Кл.</td>
                <td>Телефон Кл.</td>
            </tr>
        </thead>
        <tbody>
            {
                entries.map((entrie: any) => {
                    return <tr key={entrie.entrieId}>
                        <td>{new Date(entrie.entrieDatetime).toLocaleString()}</td>
                        <td>{entrie.entrieType}</td>
                        <td>{entrie.entrieClientName}</td>
                        <td>{entrie.entriePhone}</td>
                    </tr>
                })
            }
            
            {/* <tr>
                <td>18-12-2025-13:00:00</td>
                <td>Маникюр</td>
                <td>Алиса</td>
                <td>8(908)792-92-31</td>
            </tr>
            <tr>
                <td>18-12-2025-13:00:00</td>
                <td>Маникюр</td>
                <td>Алиса</td>
                <td>8(908)792-92-31</td>
            </tr>
            <tr>
                <td>18-12-2025-13:00:00</td>
                <td>Маникюр</td>
                <td>Алиса</td>
                <td>8(908)792-92-31</td>
            </tr> */}
        </tbody>
    </table>
  )
}

export default EntriesTable;