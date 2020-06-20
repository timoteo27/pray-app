type PrayItem = {
    id: string,
    category_id: number,
    description: string,
    created_date: Date;
    last_time_prayed?: Date;
    answered_date?: Date;
    snooze_date?: Date;
}

type Category = {
    id: number,
    name: string
}