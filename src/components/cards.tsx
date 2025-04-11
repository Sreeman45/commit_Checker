import React from "react";
interface Repos{
    repos:any[]
}
const Cards:React.FC<Repos>=({repos})=>{
    return(
        <>
             {repos.length >0 && (
          repos.map((repo,index) => (
            <a
            href={repo.html_url}
            target="_blank"
            key={index}
            className="bg-blue-600 border-[2px] hover:border-2 hover:border-yellow-500 hover:-translate-y-1 content-end-safe ease-in-out transition-all rounded-lg duration-200"
          >
            <div className="py-2 flex justify-between px-2">
              <div className="text-lg ">id:{repo.owner.id}</div>
              <div className="text-lg">{repo.created_at.split("T")[0]}</div>
            </div>
            <div>
              <h1 className="md:text-4xl md:py-6 p-4 text-3xl text-center font-bold text-white hover:underline font-[poppins]">
                {repo.name}
              </h1>
            </div>
            <div>
              <h1 className="text-lg font-semibold ">
                {repo.private}
              </h1>
            </div>
          </a>
          ))
        )}
        </>
    )
}
export default Cards;