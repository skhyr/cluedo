const genBoard = () =>{
    let stack = Array(25);
    stack.fill(3);
    stack = stack.map(e => Array(25).fill(0));
    
    //stajnia
    const stajnia = [ [0, 5], [1, 5], [2,5], [3,5],[5,5], [5,5], [5,4], [5,3], [5,2], [5,1] ];
    for(const field of stajnia)
        stack[field[0]][field[1]] = -1;
    
    //stodola
    const stodola = [ [0, 8], [1, 8], [2,8], [3,8],[4,8], [5,8], [6,8], [6,9], [6,10], [6,13], [6, 14],[5, 14],[4, 14],[3, 14],[2, 14], [1, 14], [0, 14] ];
    for(const field of stodola)
        stack[field[0]][field[1]] = -1;

    //obora
    const obora = [ [8, 0], [8, 1], [8,2], [8,3],[8,4], [8,5], [8,6], [10,6], [11,6], [12,6], [13, 6],[14, 6],[15, 6],[15, 5],[15, 3], [15, 2], [15, 1],[15, 0] ];
    for(const field of obora)
        stack[field[0]][field[1]] = -1;

    //kurnik
    const kurnik = [ [18, 0], [18, 1], [18,3],[18,4], [19,4], [20,4], [21,4], [22,4], [23,4], [24, 4] ];
    for(const field of kurnik)
        stack[field[0]][field[1]] = -1;

    //zagroda
    const zagroda = [ [24, 7], [23, 7], [22,7],[21,7], [20,7], [19,7], [18,7], [18,9], [18,10], [18, 11],[19, 11],[20, 11],[21, 11],[22, 11], [24, 11] ];
    for(const field of zagroda)
        stack[field[0]][field[1]] = -1;

    //chlew
    const chlew = [ [24, 13], [23, 13],[21,13], [20,13], [19,13], [18,13],[17,13], [17,14],[17, 16],[17, 17], [18, 17],[19, 17],[20, 17],[21, 17],[22, 17],[23, 17], [24, 17] ];
    for(const field of chlew)
        stack[field[0]][field[1]] = -1;



    
    return <number[][]>stack;
}

const bfs =  (from:{x:number, y:number}, to:{x:number, y:number}) =>{
    const graf = genBoard();
    const queue = [{ x: from.x, y: from.y }];

    while( queue.length !== 0 ){
        const current = queue.shift();
        console.log(current);
        if( !current ) return;
        if(current.x === to.x && current.y === to.y) return graf[current.x][current.y];

        if( graf[current.x+1] && graf[current.x+1][current.y] === 0){
            queue.push({ x: current.x+1, y: current.y });
            graf[current.x+1][current.y] = graf[current.x][current.y] +1;
        } 
        if( graf[current.x-1] && graf[current.x-1][current.y] === 0){
            queue.push({ x: current.x-1, y: current.y });
            graf[current.x-1][current.y] = graf[current.x][current.y] +1;
        } 
        if( graf[current.x][current.y+1] === 0){
            queue.push({ x: current.x, y: current.y+1 });
            graf[current.x][current.y+1] = graf[current.x][current.y] +1;
        } 
        if( graf[current.x][current.y-1] === 0){
            queue.push({ x: current.x, y: current.y-1 });
            graf[current.x][current.y-1] = graf[current.x][current.y] +1;
        }
    }
    return -1;
}













/*
const o = bfs({
    x: 2,
    y: 16
},{
    x: 4,
    y:7
});
console.log(o);
*/

genBoard().forEach(el=>{
    el.forEach(sub=>{
        
        process.stdout.write(` ${ sub === 0 ? ' ' : '*' } `)
    });
    process.stdout.write('\n')
})
