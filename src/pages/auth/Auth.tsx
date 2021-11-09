import React from 'react';

import Cookies  from 'js-cookie';

function Auth() {

    Cookies.get("userAuth") === undefined && function(){        
        if(window.location.pathname !== "/login"){
            window.location.assign("/login");
        }
    }();

    return ( 
        <>
        </>
    );
}

export default Auth;
