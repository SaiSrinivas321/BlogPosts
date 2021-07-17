import {createContext} from "react";

interface UserContext{
  id: string
  setId : any
}
  let initContext:UserContext={
  id:"0",
  setId:(C: string)=> {}
  }

export const Usercontext =createContext(initContext);