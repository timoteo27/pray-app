import React, { useState, FormEvent,ChangeEvent } from 'react';

interface PrayItem {
    id: string,
    category_id: number,
    prayDescription: string
}

const PrayCenter = () => {

    const cargaInicial: PrayItem[] = [{
        id: '001',
        category_id: 1, 
        prayDescription: 'Adorar pelo motivo A'
        },
        {
            id: '002',
            category_id: 2, 
            prayDescription: 'Confessar o motivo B'
        },
        {
            id: '003',
            category_id: 3, 
            prayDescription: 'Agradecer o motivo C'
        },
        {
            id: '004',
            category_id: 4, 
            prayDescription: 'Pedir pelo motivo D'
        }
    ];
    const [prayList, setPrayList] = useState<PrayItem[]>(cargaInicial);

    const [categoryId, setCategoryId] = useState(0);
    const [prayDescription, setPrayDescription] = useState('');

    function handleCategoryId(event: ChangeEvent<HTMLInputElement>){
        setCategoryId(parseInt(event.target.value));
    }

    function handlePrayDescription(event: ChangeEvent<HTMLInputElement>){
        setPrayDescription(event.target.value);
    }

    function handleIncludePray(event: FormEvent){
        event.preventDefault()

        setPrayList(
            [
                ...prayList, 
                {id: String(prayList.length),
                category_id: categoryId,
                prayDescription: prayDescription}
            ]);

        setCategoryId(0);
        setPrayDescription('');     
    }

    return (
        <div>
            <h2>Suas orações...</h2>
            
            {prayList.map(item => (
                <div key={item.id}>
                    <span>Categoria: {item.category_id} | {item.prayDescription}</span>
                </div>
            ))}

            <form onSubmit={handleIncludePray}>
                <fieldset>
                    <div>
                        <label htmlFor="prayDescription">Categoria: </label>
                        <input 
                            type="number" 
                            name="category_id" 
                            id="category_id" 
                            value={categoryId}
                            onChange={handleCategoryId}/>
                    </div>
                    <div>
                        <label htmlFor="prayDescription">Descrição: </label>
                        <input 
                            type="text" 
                            name="prayDescription" 
                            id="prayDescription"
                            value={prayDescription}
                            onChange={handlePrayDescription}/>
                    </div>

                    <div>
                        <button type="submit">Incluir</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default PrayCenter;