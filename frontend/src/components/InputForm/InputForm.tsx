import { useState, useContext } from "react";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import "./InputForm.scss";
import {displayError} from "../../utils/displayError";
import { EntriesContext, EntriesContextType } from "../../context/EntriesContext";

const InputForm = () => {
    const { addEntrie } = useContext(EntriesContext) as EntriesContextType;
    const [formData, setFormData] = useState({
        entrieDatetime: "",
        entrieType: "",
        entrieClientName: "",
        entriePhone: ""
    });
    
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData(prevState => ({...prevState, [name]: value}));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isEmpty = isObjectEmpty(formData);

        if(isEmpty) {
            displayError("Заполните все поля", setError);
            return
        };
       
        addEntrie(formData);

        setFormData({
            entrieDatetime: "",
            entrieType: "",
            entrieClientName: "",
            entriePhone: ""
        });
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Добавить запись</h2>
            <label 
                className="form__label" 
                htmlFor="entrieDatetime"
            >Дата и время</label>

            <input 
                className="form__input"
                name="entrieDatetime" 
                type="datetime-local" 
                value={formData.entrieDatetime}
                onChange={handleChange}
            />

            <label 
                className="form__label" 
                htmlFor="entrieType"
            >Тип</label>

            <input 
                className="form__input"
                name="entrieType" 
                type="text"
                value={formData.entrieType}
                onChange={handleChange} 
            />

            <label 
                className="form__label" 
                htmlFor="entrieClientName"
            >Имя клиента</label>

            <input 
                className="form__input"
                name="entrieClientName" 
                type="text"  
                value={formData.entrieClientName} 
                onChange={handleChange} 
            />

            <label 
                className="form__label" 
                htmlFor="entriePhone"
            >Телефон клиента</label>

            <input 
                className="form__input"
                name="entriePhone" 
                type="text" 
                value={formData.entriePhone} 
                onChange={handleChange} 
            />

            <button 
                className="form__button" 
                type="submit"
            >Добавить запись</button>

            {error && <p>{error}</p>}
        </form>
    );
}

export default InputForm;