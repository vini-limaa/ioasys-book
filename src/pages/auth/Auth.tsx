import React from 'react';

import Cookies  from 'js-cookie';

function Auth() {

    Cookies.get("userAuth") === undefined && function(){        
        if(window.location.pathname !== "/login"){
            window.location.assign("/login");
        }
    }();

    Cookies.get("userAuth") !== undefined && function(){
        window.location.assign("/");
    }();

    return ( 
        <>
        </>
    );
}

export default Auth;
