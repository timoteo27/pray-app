import React, { useState, FormEvent,ChangeEvent } from 'react';
import PrayComponent from './components/PrayComponent';

const PrayCenter = () => {

    //#region Temp Data
    const initialLoadCategory: Array<Category> = [
        {
            id:1,
            name: 'Adoração'
        },
        {
            id:2,
            name: 'Confissão'
        },
        {
            id:3,
            name: 'Agradecimento'
        },
        {
            id:4,
            name: 'Súplica'
        },
    ]

    const initialLoadPrays: Array<PrayItem> = [
        {
            id: '001',
            category_id: 1, 
            description: 'Adorar pelo motivo A',
            last_time_prayed: new Date(),
        },
        {
            id: '002',
            category_id: 2, 
            description: 'Confessar o motivo B',
            last_time_prayed: new Date(),
        },
        {
            id: '003',
            category_id: 3, 
            description: 'Agradecer o motivo C',
            last_time_prayed: new Date(),
        },
        {
            id: '004',
            category_id: 4, 
            description: 'Pedir pelo motivo D',
            last_time_prayed: new Date(),
        }
    ];
    //#endregion

    const [prayList, setPrayList] = useState<PrayItem[]>(initialLoadPrays);
    const [categoryList, setCategoryList] = useState<Category[]>(initialLoadCategory);

    const [categoryId, setCategoryId] = useState(0);
    const [prayDescription, setPrayDescription] = useState('');    

    function handlePrayDescription(event: ChangeEvent<HTMLInputElement>){
        setPrayDescription(event.target.value);
    }

    function handleIncludePray(event: FormEvent){
        event.preventDefault();

        setPrayList(
            [
                ...prayList, 
                {
                    id: String(prayList.length),
                    category_id: categoryId,
                    description: prayDescription,
                    last_time_prayed: new Date()
                }
            ]);

        setCategoryId(0);
        setPrayDescription('');     
    }

    function handleSelectCategory(event: ChangeEvent<HTMLSelectElement>){
        setCategoryId(parseInt(event.target.value));
    }

    function handleDeletePray(pray: PrayItem ){
        let filteredPrayList = prayList.filter(e => e !== pray);
        setPrayList(filteredPrayList);        
    }

    //TODO: verificar formar melhor de fazer a alteração. Ideal é referenciar especificamente o item que deve sre alterado, e não percorrer todo o array.
    function handleMakePray(pray: PrayItem ){
        pray.last_time_prayed = new Date();
        
        //TODO: alguns testes da função filter. Remover!
        let updatedPrayList = prayList.filter(function (e: PrayItem, index) {
                                                                        if(e === pray){
                                                                            e.last_time_prayed = new Date();                                                                            
                                                                        }
                                                                        return true;
                                                                    });
        setPrayList(updatedPrayList);                  
    }

    function handleEditPray(pray: PrayItem){
        handleDeletePray(pray);
        setCategoryId(pray.category_id);
        setPrayDescription(pray.description);
    }

    return (
        <div>
            <h2>Suas orações...</h2>
            
            {prayList.map(item => (
                <PrayComponent key={item.id}  pray={item} deletePray={handleDeletePray} makePray={handleMakePray} editPray={handleEditPray}/>                
            ))}

            <form onSubmit={handleIncludePray}>
                <fieldset>
                    <div>
                        <label htmlFor="prayDescription">Categoria: </label>
                        <select 
                            value={categoryId}
                            onChange={handleSelectCategory}>
                            <option value={0}>Selecione uma categoria...</option>
                            {categoryList.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>                       
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