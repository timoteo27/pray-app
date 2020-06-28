import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import PrayComponent from './components/PrayComponent';

import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

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
            category_id: 4,
            description: 'Pedir pelo motivo E',
            created_date: new Date(2020, 1, 15),
            answered_date: new Date(2020, 5, 27),
            last_time_prayed: undefined,
        }
        ,
        {
            id: '006',
            category_id: 4,
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
                        if (pray.last_time_prayed === undefined) {
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
                            (filterFieldset.answered && pray.answered_date !== undefined) ||
                            (filterFieldset.snooze && pray.snooze_date !== undefined)
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

    function handleSelectCategory(event: ChangeEvent<{ value: unknown }>) {
        setCategoryId(event.target.value as number);
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

    function handleSnoozePray(pray: PrayItem, days: number) {
        let snoozedDate = new Date();
        snoozedDate.setDate(snoozedDate.getDate() + days);
        pray.snooze_date = snoozedDate;
    }

    function handleMakeAnswered(pray: PrayItem) {
        pray.answered_date = new Date();
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

            <FormControl component="fieldset">
                <FormLabel component="legend">Opções de Filtros:</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={filterFieldset.onlyNotPrayedToday} onChange={handleCheckboxChange} name="onlyNotPrayedToday" />}
                        label="Apenas Não Oradas Hoje"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={filterFieldset.answered} onChange={handleCheckboxChange} name="answered" />}
                        label="Respondidas"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={filterFieldset.snooze} onChange={handleCheckboxChange} name="snooze" />}
                        label="Postergadas"
                    />
                </FormGroup>

            </FormControl>

            <Box display="flex" flexWrap="wrap" flexDirection="row" m={2} p={2}>            
                {filteredPrayList.map(item => (
                    <PrayComponent
                        key={item.id}
                        prayItem={item}
                        deletePray={handleDeletePray}
                        makePray={handleMakePray}
                        editPray={handleEditPray}
                        snoozePray={handleSnoozePray}
                        markAnswered={handleMakeAnswered} />
                ))}
            </Box>

            <form>
                <fieldset>
                    <legend>Incluir / Alterar Oração:</legend>

                    <div>
                        <FormControl variant="outlined" size="small" >
                            <InputLabel htmlFor="selectCategory">Categoria</InputLabel>
                            <Select
                                label="Categoria"
                                id="selectCategory"
                                native
                                value={categoryId}
                                onChange={handleSelectCategory}
                            >
                                <option aria-label="None" value="" />
                                {categoryList.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField id="outlined-basic" label="Descrição" variant="outlined" size="small" onChange={handlePrayDescription} value={prayDescription} />
                        <Button variant="contained" color="primary" onClick={handleIncludePray}>Incluir</Button>
                    </div>

                </fieldset>
            </form>
        </div>
    );
};

export default PrayCenter;