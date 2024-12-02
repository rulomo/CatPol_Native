import React from 'react'


export const EstandaritzedArticles = (article:any,apartado:any,opcion:any,) => {
    
    let str = article; 
    if (apartado!==""){
      str+=`.${apartado}`
    }
    if (opcion!==""){
      str+=`.${opcion}`
    }
  return str
  
}

export const addDaysToDate=(date:Date,days:number)=>{
    let res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
}
  

