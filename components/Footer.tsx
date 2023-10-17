import React from 'react';

function Footer() : JSX.Element{
    return(
        <div className="py-5 text-center">
            <div className="text-sm mt-2 opacity-50">
                &copy; {new Date().getFullYear()} Assignment. All right reserved.
            </div>
        </div>
    )
}

export default Footer;