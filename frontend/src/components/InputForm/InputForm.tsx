import { useState } from "react";
import "./InputForm.scss";

const InputForm = () => {
    const [formData, setFormData] = useState({
        entrieDatetime: "",
        entrieType: "",
        entrieClientName: "",
        entriePhone: ""
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData(prevState => ({...prevState, [name]: value}));
        
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

       const isObjectEmpty = (obj: any): boolean => {
        for(let key in obj){
            if(obj[key] === ""){
                console.log(obj[key]);
                return true;
            }  
        }
            return false;
       }

       isObjectEmpty(formData);


       console.log(isObjectEmpty(formData));
       
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
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
        </form>
    );
}

export default InputForm;