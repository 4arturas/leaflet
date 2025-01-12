function as_CreateNode( y, x )
{
    return {
        y: y, x: x,
        h: 0, f: 0, g:0,
        passable: 1, closed: 0, visited: 0, cost: 0
    }
}
function rnd_Int( x, y )
{
    return Math.floor(
        Math.random() * ( y - x + 1 ) + x
    );
}
function as_NodesEqual( a, b )
{
    return a.x === b.x && a.y === b.y;
}
function as_Manhattan( a, b )
{
    const y = Math.abs( a.y - b.y );
    const x = Math.abs( a.x - b.x );
    let dist = ( y*y ) + ( x*x );
    dist = Math.sqrt( dist );
    return dist;
}
function as_CreateNode( x, y )
{
    return {
        x, y,
        passable: 1,
        closed: 0,
        visited: 0,
        cost: 0,
        g: 0, h: 0, f: 0
    };
}
function as_Create( points )
{
    return points.map( point => (
        as_CreateNode( point.x, point.y )
    ));
}

////////////////////////////////
function as_FindShortestPath( points, start, target )
{
    // points = points.filter( p => { return p.x !== start.x && p.y !== start.y ;} );
    // points = points.filter( p => { return p.x !== target.x && p.y !== target.y ;} );
    const nodes = as_Create( points );
    let node, currentNode;
    let idx;
    const startNode = as_CreateNode( start.x, start.y );
    const targetNode = as_CreateNode( target.x, target.y );

    const pq = pq_Create( nodes.length/*start target*/ );
    pq.fnHeur = function ( n0, n1 )
    {
        return n0.f < n1.f;
    }
    pq.fnEqual = function ( n0, n1 )
    {
        return as_NodesEqual( n0, n1 );
    }
    pq_Enqueue( pq, startNode );
    while ( pq.count > 0 )
    {
        currentNode = pq.arr[1];
        pq_Dequeue( pq, 1 );
        if ( as_NodesEqual( targetNode, currentNode ) )
            break;

        currentNode.closed = 1;

        for ( let i = 0; i < nodes.length; i++ )
        {
            node = nodes[i];
            if ( node.closed === 1 ) continue;
            if ( node.passable === 0 ) continue;

            const g = node.cost + currentNode.g;
            if ( node.visited === 0 || node.g > g )
            {
                node.g = g;
                node.h = as_Manhattan( node, targetNode );
                node.f = node.g + node.h;
                if ( node.visited === 1 )
                {
                    idx = pq_GetIdx( pq, node );
                    pq_Dequeue( pq, idx );
                }
                pq_Enqueue( pq, node );
                node.visited = 1;
            }
        } // end for i
    } // end while

    const path = [];
    while (pq.count !== 0)
    {
        const e = pq.arr[1];
        path.push( e );
        pq_Dequeue(pq, 1);
    } // end while
    console.log( path );
    return path;
}