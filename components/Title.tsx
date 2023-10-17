import React from 'react';

function Title({titlename} : {titlename : string}) : JSX.Element{
    return(
        <h1 className="text-2xl font-bold decoration-4 mb-5 text-stone-900">{titlename}</h1>
    )
}

export default Title;;