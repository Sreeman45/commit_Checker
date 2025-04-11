import { useContext, useEffect, useState } from "react";
import fetchWithToken from "@/fetch";
interface CommitDay {
  date: string;
  count: number;
}
interface Props {
  trigger: boolean;
}
import { context } from "@/App";

import CommitChart from "./graph";
import Cards from "./cards";

const ReposChart: React.FC<Props> = ({ trigger }) => {
  const [user, setUser] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");
  const [repos, setRepos] = useState<any[]>([]);
  const [commits, setCommits] = useState<CommitDay[]>([]);

  const [isInitialMount,setInitialMount]=useState<boolean>(true)
  const importedcontext = useContext(context);
  const Token = import.meta.env.VITE_GITHUB;
  console.log("the token is", Token);
  if (!importedcontext) {
    return null;
  }
  const { text,setError } = importedcontext;
  const fetchData = async (username: string) => {
   

    try {
      const res = await fetchWithToken(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const data = await res.json();
      console.log("worst thing",data);
      setRepos(data);
      setUser(data[0].owner.login);
      setProfileImg(data[0].owner.avatar_url);
      setError('')
      const noofCommitsperday: Record<string, number> = {};
      for (let repo of data) {
        const commitsRes = await fetchWithToken(
          `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`
        );
        const commitsData = await commitsRes.json();
        commitsData.forEach((commit: any) => {
          const date = new Date(commit.commit.author.date)
            .toISOString()
            .split("T")[0];
          noofCommitsperday[date] = (noofCommitsperday[date] || 0) + 1;
        });
      }
     
      const commitsArray: CommitDay[] = Object.entries(noofCommitsperday)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));
      setCommits(commitsArray);
      console.log(commitsArray)
    } catch (err) {
      console.log("errorr" + err);
      setError('username does not exist')
    } finally {
      
    }
  };

  useEffect(() => {
    if (isInitialMount) {
       setInitialMount(false)
      console.log('yes I mounted')
      return;
    }
    fetchData(text);
  }, [trigger]);

  if(!repos.length){
    return<main className="w-full h-screen bg-black flex flex-col justify-center items-center">
       <h1 className="font-[poppins] text-center h-[70vh] md:text-7xl text-6xl font-bold bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 bg-clip-text text-transparent mx-1">search by Github username
       <div className="text-center  md:text-3xl text-2xl mt-7 bg-gradient-to-r from-cyan-700  to-lime-600 bg-clip-text text-transparent font-semibold ">find respositories,daily commits and more...</div>
       </h1>
      
     </main>
  }
  return (
    <>
    <div className="w-full flex justify-center items-center bg-black text-white ">
      <div className="flex gap-4 items-center justify-center">
        <img src={profileImg} className="size-36 rounded-full "/>
          <a href={repos[0]?.html_url} target="_blank"><h2 className="md:text-6xl text-4xl font-bold font-[poppins] hover:underline">{user}</h2></a>
      </div>
    </div>
    <main className="w-full bg-black text-white flex justify-center py-10">
      <div className="md:w-4/5 w-9/10 grid grid-cols-1 md:grid-cols-2 md:gap-y-8 gap-y-2 gap-x-4 max-h-screen overflow-y-auto py-8 px-2 scroll-smooth fancyscroll">
       <Cards repos={repos}/>
      </div>
    </main>
    <div className="bg-black w-full">
    <CommitChart commitsArray={commits}/></div>
    </>
  );
};
export default ReposChart;
