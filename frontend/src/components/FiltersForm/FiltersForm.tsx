import { useState } from 'react';
import { MdFilterList } from 'react-icons/md';
import "./FiltersForm.scss";

const FiltersForm = () => {
    const [isOpen, setIsOpen] = useState<boolean>(JSON.parse(localStorage.getItem("FiltersIsOpen") || "false"));
    
    const toggleFilters = () => {
        setIsOpen(!isOpen);
        localStorage.setItem('FiltersIsOpen', JSON.stringify(!isOpen));
        console.log(isOpen);
        
    }
    return (
        <form className="filters__form">
            <div className="filters__header">
                <h2 className="filters__title">Фильтры</h2>

                <button 
                    type="button" 
                    className="filters__button" 
                    onClick={toggleFilters}
                >
                    <MdFilterList  />
                </button>
            </div>

            {   
                isOpen && <div className="filters__content">
                    <label htmlFor="">Дата</label>
                    <input type="text" />
                    <label htmlFor="">Тип</label>
                    <input type="text" />
                    <label htmlFor="">Имя клиента</label>
                    <input type="text" />
                    <label htmlFor="">Телефон клиента</label>
                    <input type="text" />
                    <button>
                        Применить
                    </button>
                </div>
            }
        </form>
    )
}

export default FiltersForm;