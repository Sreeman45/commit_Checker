const Token = import.meta.env.VITE_GITHUB;

console.log(Token)
const fetchWithToken = async (url: string) => {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${Token}`,
        Accept: "application/vnd.github+json",
      },
    });
  };
export default fetchWithToken