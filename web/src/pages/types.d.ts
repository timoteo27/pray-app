type PrayItem = {
    id: string,
    category_id: number,
    description: string,
    last_time_prayed: Date;
}

type Category = {
    id: number,
    name: string
}