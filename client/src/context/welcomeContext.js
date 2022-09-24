import React,{ createContext, useState } from "react";
import MainLeft from "../admin/components/MainLeft";

 export const WelcomeContext =createContext();


 export default function WelcomeStatusProvider(){

    const [welcomestatus, setwelcomestatus] = useState(false);

    return(
        <WelcomeContext.Provider value={welcomestatus }>
          <MainLeft />
        </WelcomeContext.Provider>
    )
 }

 