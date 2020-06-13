import React, {FormEvent, useState, ChangeEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';

import './styles.css';

const Home = () => {

    const history = useHistory();

    const [formData, setFormData] = useState({
        userName: ''
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    }

    function handleSubmit(event: FormEvent){
        event.preventDefault();
    }    

    return (
        <div className="page-home">
            <h1>Bem vindo!</h1>            

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Como posso chamar você?</legend>
                    <div className="field">
                        <label htmlFor="userName">Nome: </label>
                        <input type="text" name="userName" id="userName" onChange={handleInputChange}/>                    
                    </div>
                    <div className="footer">
                        <Link to='pray-center' >
                            <button type="submit">Entrar</button>
                        </Link>
                    </div>
                </fieldset>
            </form>
            
        </div>
    );
}

export default Home;

