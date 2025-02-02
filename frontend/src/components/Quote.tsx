import { useEffect, useState } from "react";
import axios from "axios";

interface QuoteType {
  quote: string;
  author: string;
  body: any;
}

function Quote() {
  const [quo, setQuo] = useState<QuoteType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = '/quote' ;
        const response = await axios.get(url);
        // console.log(response.data.data[0]);
        setQuo(response.data.data[0]);
        setError(null);
      } catch (error) {
        console.error("Error fetching quote:", error);
        setError("Failed to fetch quote. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className=" p-4">
        {error ? (
          <div className="text-red-500 font-bold">{error}</div>
        ) : quo ? (
          <div>
            <div className="font-bold text-lg mb-2">"{quo.quote}"</div>
            <div className="text-gray-700 italic">- {quo.author}</div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Quote;