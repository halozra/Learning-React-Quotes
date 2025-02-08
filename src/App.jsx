import axios from "axios";
import { useState } from "react";

const url = "https://api.api-ninjas.com/v1/quotes?";
const apiKey = import.meta.env.VITE_KEY;
const backgrounds = [
  "url('/src/assets/hadHDBahdbsahbdwud001.jpg')",
  "url('/src/assets/hadHDBahdbsahbdwud002.jpg')",
  "url('/src/assets/hadHDBahdbsahbdwud003.jpg')",
  "url('/src/assets/hadHDBahdbsahbdwud004.jpg')",
  "url('/src/assets/hadHDBahdbsahbdwud005.jpg')",
  "url('/src/assets/hadHDBahdbsahbdwud006.jpg')",
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
