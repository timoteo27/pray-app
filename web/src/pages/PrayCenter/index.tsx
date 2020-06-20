import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import PrayComponent from './components/PrayComponent';

const PrayCenter = () => {

    //#region Temp Data
    const initialLoadCategory: Array<Category> = [
        {
            id: 1,
            name: 'Adoração'
        },
        {
            id: 2,
            name: 'Confissão'
        },
        {
            id: 3,
            name: 'Agradecimento'
        },
        {
            id: 4,
            name: 'Súplica'
        },
    ]

    const initialLoadPrays: Array<PrayItem> = [
        {
            id: '001',
            category_id: 1,
            description: 'Adorar pelo motivo A',
            created_date: new Date(),
            last_time_prayed: new Date(),
            snooze_date: new Date(2021, 12, 2),
        },
        {
            id: '002',
            category_id: 2,
            description: 'Confessar o motivo B',
            created_date: new Date(),
            last_time_prayed: new Date(),
        },
        {
            id: '003',
            category_id: 3,
            description: 'Agradecer o motivo C',
            created_date: new Date(),
            last_time_prayed: new Date(),
        },
        {
            id: '004',
            category_id: 4,
            description: 'Pedir pelo motivo D',
            created_date: new Date(2020, 1, 15),
            answered_date: new Date(2020, 5, 27),
            last_time_prayed: undefined,
        }
        ,
        {
            id: '005',
            category_id: 5,
            description: 'Pedir pelo motivo E',
            created_date: new Date(2020, 1, 15),
            answered_date: new Date(2020, 5, 27),
            last_time_prayed: undefined,
        }
        ,
        {
            id: '006',
            category_id: 6,
            description: 'Pedir pelo motivo F',
            created_date: new Date(2020, 1, 15),
            answered_date: new Date(2020, 5, 27),
            last_time_prayed: undefined,
        }
    ];
    //#endregion

    const [prayList, setPrayList] = useState<PrayItem[]>(initialLoadPrays);
    const [filteredPrayList, setFilteredPrayList] = useState<PrayItem[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>(initialLoadCategory);

    const [categoryId, setCategoryId] = useState(0);
    const [prayDescription, setPrayDescription] = useState('');

    const [filterFieldset, setFilterFieldset] = useState({
        onlyNotPrayedToday: false,
        answered: false,
        snooze: false,
    });

    //For filtering praylist
    useEffect(() => {

        console.log("Filtrando...")

        //Nothing checked!        
        if (!filterFieldset.answered && !filterFieldset.snooze && !filterFieldset.onlyNotPrayedToday) {
            console.log("Nenhum filtro selecionado");
            setFilteredPrayList(prayList);
        } else {
            setFilteredPrayList(
                prayList.filter((pray) => {

                    if (filterFieldset.onlyNotPrayedToday) {
                        if ( pray.last_time_prayed == undefined){
                            return true;
                        } else {
                            let lastSecondYesterday = new Date();
                            lastSecondYesterday.setTime(-1);
                            lastSecondYesterday.setDate(lastSecondYesterday.getDate() - 1);
                            console.log(lastSecondYesterday);
                            
                            return (pray.last_time_prayed <= lastSecondYesterday)
                        }

                    } else {
                        return (
                            filterFieldset.answered && pray.answered_date !== undefined ||
                            filterFieldset.snooze && pray.snooze_date !== undefined
                        )
                    }
                })
            )
        }
    }, [filterFieldset, prayList])

function handlePrayDescription(event: ChangeEvent<HTMLInputElement>) {
    setPrayDescription(event.target.value);
}

function handleIncludePray(event: FormEvent) {
    event.preventDefault();

    setPrayList(
        [
            ...prayList,
            {
                id: String(prayList.length),
                category_id: categoryId,
                description: prayDescription,
                created_date: new Date(),
                last_time_prayed: undefined
            }
        ]);

    setCategoryId(0);
    setPrayDescription('');
}

function handleSelectCategory(event: ChangeEvent<HTMLSelectElement>) {
    setCategoryId(parseInt(event.target.value));
}

function handleDeletePray(pray: PrayItem) {
    let filteredPrayList = prayList.filter(e => e !== pray);
    setPrayList(filteredPrayList);
}

//TODO: verificar formar melhor de fazer a alteração. Ideal é referenciar especificamente o item que deve sre alterado, e não percorrer todo o array.
function handleMakePray(pray: PrayItem) {
    pray.last_time_prayed = new Date();

    //TODO: alguns testes da função filter. Remover!
    let updatedPrayList = prayList.filter(function (e: PrayItem, index) {
        if (e === pray) {
            e.last_time_prayed = new Date();
        }
        return true;
    });
    setPrayList(updatedPrayList);
}

function handleEditPray(pray: PrayItem) {
    handleDeletePray(pray);
    setCategoryId(pray.category_id);
    setPrayDescription(pray.description);
}


function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    let { name, checked } = event.target;

    setFilterFieldset({
        ...filterFieldset,
        [name]: checked
    })
}

return (
    <div>
        <h2>Suas orações...</h2>

        <fieldset>
            <legend>Filtros:</legend>
            <label>
                Apenas Não Oradas Hoje
                    <input type="checkbox" name="onlyNotPrayedToday" checked={filterFieldset.onlyNotPrayedToday} onChange={handleCheckboxChange} />
            </label>
            <label>
                Respondidas
                    <input type="checkbox" name="answered" checked={filterFieldset.answered} onChange={handleCheckboxChange} />
            </label>
            <label>
                Postergadas
                    <input type="checkbox" name="snooze" checked={filterFieldset.snooze} onChange={handleCheckboxChange} />
            </label>
        </fieldset>

        {filteredPrayList.map(item => (
            <PrayComponent key={item.id} pray={item} deletePray={handleDeletePray} makePray={handleMakePray} editPray={handleEditPray} />
        ))}

        <form onSubmit={handleIncludePray}>
            <fieldset>
                <legend>Incluir / Alterar Oração:</legend>
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
                        onChange={handlePrayDescription} />
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