import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import React, {  useContext } from "react"
interface Props{
  onClick:()=>void
}
import { context } from "@/App"

const Header:React.FC<Props>=({onClick})=>{
      const importedContext=useContext(context)
      if(!importedContext){
        return null
      }
      const {setText,error}=importedContext
    
    return(
        <header className="w-full h-[30vh]  bg-black flex justify-center items-end pb-12 ">
            <div >
           <div className="text-white font-bold text-4xl md:text-6xl font-[poppins]">WELCOME...</div>
           <div className="md:flex  w-full max-w-sm items-center space-x-2 mt-6">
      <Input type="text" placeholder="Enter username"  className="text-white placeholder:text-lg text-lg mb-4 md:mb-0 " onChange={(e)=>setText(e.target.value)}
       />
      <Button type="submit" className="cursor-pointer bg-amber-500 hover:bg-white hover:text-black font-semibold  " onClick={onClick} >Submit</Button>
    </div>
    {error &&
    <div className="text-lg text-red-500" >{error}</div>
}
    </div>
        </header>
    )
}
export default Header