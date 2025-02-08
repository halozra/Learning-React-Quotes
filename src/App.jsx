import axios from "axios";
import { useState } from "react";

const url = "https://api.api-ninjas.com/v1/quotes?";
const apiKey = import.meta.env.VITE_KEY;
const backgrounds = [
  "url('https://c4.wallpaperflare.com/wallpaper/695/331/660/digital-art-artwork-women-cityscape-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/803/347/759/anime-natural-light-landscape-forest-studio-ghibli-hd-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/822/323/828/spiderman-into-the-spider-verse-2018-movies-movies-spiderman-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/317/897/146/1920x1080-px-dark-heath-ledger-joker-monochrome-animals-frogs-hd-art-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/373/676/41/kimetsu-no-yaiba-anime-anime-boys-tanjiro-kamado-kamado-tanjirō-hd-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/158/774/427/anime-studio-ghibli-spirited-away-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/400/369/234/2560x1080-px-fantasy-art-painting-ultra-wide-anime-naruto-hd-art-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/664/373/122/forest-mikael-gustafsson-landscape-horizon-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/40/849/87/anime-girls-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/165/511/588/anime-girls-gun-school-uniform-houkai-gakuen-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/258/501/148/berserk-black-swordsman-guts-kentaro-miura-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/590/529/244/anime-naruto-kakashi-hatake-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/736/555/702/anime-berserk-forest-guts-berserk-wallpaper-preview.jpg')",
  "url('https://c4.wallpaperflare.com/wallpaper/249/973/174/anime-jujutsu-kaisen-yuji-itadori-hd-wallpaper-preview.jpg')",
  
];

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [backgroundIndex, setRandom] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const getQuote = async () => {
    if (isDisabled) return;
    setIsDisabled(true);
    try {
      const response = await axios.get(url, {
        headers: { "X-Api-Key": apiKey },
      });
      setQuote(response.data[0].quote);
      setAuthor(response.data[0].author);
      const randomIndex = Math.floor(Math.random() * backgrounds.length);
      setRandom(randomIndex);
    } catch (error) {
      console.log("Error fetching quotes", error);
    } finally {
      setTimeout(() => setIsDisabled(false), 10000);
    }
  };

  return (
    <div
      style={{ background: backgrounds[backgroundIndex] }}
      className="flex justify-center items-center h-screen w-full bg-cover"
    >
      <div className="flex flex-col justify-center items-center gap-5 p-10 w-[800px] h-[400px] bg-white/50 rounded-3xl font-serif shadow-lg">
        <h1 className="text-[30px] text-center italic">
          {quote || "Click the button to get a quote"}
        </h1>
        {author && <p>- {author}</p>}
        <button
          className="rounded-md mt-8 px-6 py-2 bg-black/50 text-white/50 hover:bg-gray-800 transition duration-300 shadow-black shadow-sm hover:text-yellow-500"
          onClick={getQuote}
        >
          {isDisabled ? `Wait...` : "Get Quote"}
        </button>
      </div>
    </div>
  );
}

export default App;
