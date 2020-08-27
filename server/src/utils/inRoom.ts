export default (x: number, y: number) =>{
    const rooms = [
        {
            x1: 0,
            x2: 6,
            y1: 0,
            y2: 6,
        },{
            x1: 0,
            x2: 7,
            y1: 9,
            y2: 15,
        },{
            x1: 0,
            x2: 6,
            y1: 19,
            y2: 25,
        },{
            x1: 9,
            x2: 16,
            y1: 0,
            y2: 7,
        },{
            x1: 19,
            x2: 25,
            y1: 0,
            y2: 5,
        },{
            x1: 19,
            x2: 25,
            y1: 8,
            y2: 12,
        },
        {
            x1: 18,
            x2: 25,
            y1: 14,
            y2: 18,
        },
        {
            x1: 18,
            x2: 25,
            y1: 21,
            y2: 25,
        },{
            x1: 10,
            x2: 15,
            y1: 18,
            y2: 25,
        },
    ];

    return rooms.findIndex(el=>
        el.x1 < x && x < el.x2 &&
        el.y1 < y && y < el.y2       
    )
}