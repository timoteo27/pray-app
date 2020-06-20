import React, {useState, useEffect} from 'react';

interface PrayItemProps {
    pray: PrayItem;
    deletePray: (p: PrayItem) => void;
    makePray: (p: PrayItem) => void;
    editPray: (p: PrayItem) => void;
}

const PrayItem: React.FC<PrayItemProps> = ({pray, deletePray, makePray, editPray}) => {
    
    const [prayState, setPrayState] = useState<PrayItem>(pray)
        
    const [flagPrayInformation, setFlagPrayInformation] = useState(false);

    useEffect(() => {
        setPrayState(pray);
        console.log('useEffect!');
    }, [pray]);

    function returnDateTimeForUser(dateTime: Date | undefined){
        if (dateTime == undefined){
            return 'Nunca!'
        }
        return `${dateTime.toLocaleTimeString()} ${dateTime.toLocaleDateString()}`;        
    }

    return (
        <div key={prayState.id}>    
            <div id="prayInformation" hidden={flagPrayInformation}>
                <span>
                    Categoria: {prayState.category_id} | 
                    {prayState.description} | 
                    Última oração em: {returnDateTimeForUser(prayState.last_time_prayed)} |
                    Postergado para: {returnDateTimeForUser(prayState.snooze_date)} |
                </span>
                <button type="button" id="buttonPray" onClick={() => makePray(pray)}>Orar</button>
                <button type="button" id="buttonOptions" onClick={() => {setFlagPrayInformation(true)}}>Mais opções...</button>
            </div>                
            <div id="prayOptions" hidden={!flagPrayInformation}> 
                <a href="#">Marcar como Respondida</a> / 
                <a href="#" onClick={() => editPray(prayState)}>Alterar</a> / 
                <a href="#">Esconder por uma semana</a> / 
                <a href="#" onClick={() => deletePray(prayState)}>Excluir</a> / 
                <button type="button" id="buttonReturn" onClick={() => {setFlagPrayInformation(false)}}>Voltar</button>
            </div>
        </div>
    )
}

export default PrayItem;