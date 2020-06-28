import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

interface PrayItemProps {
    prayItem: PrayItem;
    deletePray: (p: PrayItem) => void;
    makePray: (p: PrayItem) => void;
    editPray: (p: PrayItem) => void;
    snoozePray: (p: PrayItem, days: number) => void;
    markAnswered: (p: PrayItem) => void;
}

const useStyles = makeStyles({
    root: {
      minWidth: 310,
    }
  });

const PrayItem: React.FC<PrayItemProps> = ({ prayItem, deletePray, makePray, editPray, snoozePray, markAnswered }) => {

    const classes = useStyles();

    const [pray, setPray] = useState<PrayItem>(prayItem)

    const [flagPrayInformation, setFlagPrayInformation] = useState(false);

    useEffect(() => {
        setPray(prayItem);
        console.log('useEffect!');
    }, [prayItem]);

    function returnDateTimeForUser(dateTime: Date | undefined) {
        if (dateTime == undefined) {
            return 'Nunca!'
        }
        return `${dateTime.toLocaleTimeString()} ${dateTime.toLocaleDateString()}`;
    }

    return (
        <Box component="div" display="inline" m={1} boxShadow={2}>
            <Card key={pray.id} variant="outlined" className={classes.root}>
                <div id="prayInformation" hidden={flagPrayInformation}>
                    <CardContent>
                        Categoria: {pray.category_id}<br />
                        {pray.description}<br />
                        Última oração em: {returnDateTimeForUser(pray.last_time_prayed)}<br />
                        Respondida em: {returnDateTimeForUser(pray.answered_date)}<br />
                        Postergado para: {returnDateTimeForUser(pray.snooze_date)}<br />                                                
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => makePray(prayItem)}>
                        Orar
                        </Button>
                        <Button size="small" color="primary" onClick={() => { setFlagPrayInformation(true) }}>
                        Mais opções
                        </Button>
                    </CardActions>
                </div>
                <div id="prayOptions" hidden={!flagPrayInformation}>
                    <CardContent>
                        <a href="#" onClick={() => {
                            markAnswered(pray);
                            setFlagPrayInformation(false);
                        }}>
                            Marcar como Respondida</a> <br />
                        <a href="#" onClick={() => {
                            editPray(pray);
                            setFlagPrayInformation(false);
                        }}>Alterar</a> <br />
                        <a href="#" onClick={() => {
                            snoozePray(pray, 7);
                            setFlagPrayInformation(false);
                        }}>Esconder por uma semana</a> <br />
                        <a href="#" onClick={() => {
                            deletePray(pray);
                            setFlagPrayInformation(false);
                        }}>Excluir</a> <br />
                    </CardContent>
                    <CardActions>
                        <Button id="buttonReturn" size="small" color="primary" onClick={() => { setFlagPrayInformation(false) }}>
                        Voltar
                        </Button>
                    </CardActions>
                </div>
            </Card>
        </Box>
    )
}

export default PrayItem;