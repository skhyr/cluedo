export default (x: number, y: number) =>{
    const rooms = [
        {
            x1: 0,
            x2: 5,
            y1: 0,
            y2: 5,
        },{
            x1: 0,
            x2: 6,
            y1: 8,
            y2: 14,
        },{
            x1: 0,
            x2: 6,
            y1: 18,
            y2: 24,
        },{
            x1: 8,
            x2: 15,
            y1: 0,
            y2: 6,
        },{
            x1: 18,
            x2: 24,
            y1: 0,
            y2: 4,
        },{
            x1: 18,
            x2: 24,
            y1: 7,
            y2: 11,
        },
        {
            x1: 17,
            x2: 24,
            y1: 13,
            y2: 17,
        },{
            x1: 17,
            x2: 24,
            y1: 21,
            y2: 24,
        },{
            x1: 9,
            x2: 14,
            y1: 17,
            y2: 24,
        },{
            x1: 10,
            x2: 14,
            y1: 9,
            y2: 15,
        },
    ];

    return rooms.findIndex(el=>
        el.x1 <= x && x <= el.x2 &&
        el.y1 <= y && y <= el.y2       
    )
}