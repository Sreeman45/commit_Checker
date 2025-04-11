
import { useState,createContext, Dispatch,SetStateAction } from 'react';
import './App.css';
import Header from './components/header';
import ReposChart from './components/repos';

interface Context{
    text:string
    setText:Dispatch<SetStateAction<string>>
    error:string
    setError:Dispatch<SetStateAction<string>>
}
export const context=createContext<Context | null>(null)
function App() {
const [trigger,setTrigger]=useState<boolean>(false)
const [error,setError]=useState<string>('')
const [text,setText]=useState('')
 const triggerFunction=()=>{
      setTrigger(!trigger)
 }
  return (
    <context.Provider value={{setText,text,error,setError}}>

        <Header onClick={triggerFunction} />
        <ReposChart  trigger={trigger}/>
      
    </context.Provider>
  );
}

export default App;