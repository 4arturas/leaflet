function pq_Create( size )
{
    var pq = {
        count: 0,
        arr: new Array( size+1 ),
        fnHeur: null,
        fnEqual: null
    };
    return pq;
}
function pq_Heur( e0, e1 )
{
    return e0.f < e1.f;
}
function pq_Enqueue( pq, e )
{
    var parent, child;
    pq.count++;
    parent = Math.floor( pq.count/2 );
    child = pq.count;
    while ( parent > 0 )
    {
        if ( pq.fnHeur( pq.arr[parent], e ) )
        {
            pq.arr[child] = pq.arr[parent];
            child = parent;
            parent = Math.floor( parent/2 );
        }
        else
            break;
    } // else
    pq.arr[child] = e;
}
function pq_Dequeue( pq, idx )
{
    var parent, child;
    var e = pq.arr[idx] = pq.arr[pq.count];
    parent = idx;
    child = idx * 2;
    while ( pq.count > child )
    {
        if ( pq.count+1 > child )
        {
            if ( pq.fnHeur( pq.arr[child], pq.arr[child+1] ) )
                child++;
        }
        if ( pq.fnHeur( e, pq.arr[child] ) )
        {
            pq.arr[parent] = pq.arr[child];
            parent = child;
            child *= 2;
        }
        else
            break;
    } // end while
    pq.count--;
    pq.arr[parent] = e;
}
function pq_GetIdx( pq, n )
{
    let i;
    for ( i = 1; i <= pq.count; i++ )
    {
        if ( pq.fnEqual( pq.arr[i], n ) )
            return i;
    }
    return -1;
}

function pq_Test()
{
    var size = 10;
    var pq = pq_Create( size );
    var e = { f: 0 };
    var i;
    for ( i = 0; i < size; i++ )
    {
        e = { f: i };
        pq_Enqueue( pq, e );
    } // end for i
    while ( pq.count !== 0 )
    {
        e = pq.arr[1];
        console.log( e.f );
        pq_Dequeue( pq, 1 );
    } // end while
}
// pq_Test();