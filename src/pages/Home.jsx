import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AppContext, TweetCard, useToast, TweetBox } from "@/components/Index";

const Home = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { infiniteScroll, page } = useContext(AppContext);

  const [progress, setProgress] = useState(0);
  const [tweets, setTweets] = useState([]);

  const getFeedTweets = async () => {
    setLoading(true);
    setProgress(progress + 30);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tweet?page=${page}&limit=20`,
        { withCredentials: true }
      );
      setTweets((prev) => [...prev, ...response.data.data.tweets]);
      setLoading(false);
      setProgress(progress + 100);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        variant: "destructive",
        title: "error",
        description: `${error.message}`,
      });
      setProgress(progress + 100);
    }
  };

  useEffect(() => {
    getFeedTweets();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, []);

  return (
    <>
      <TweetBox />
      {tweets.map((tweet, index) => (
        <TweetCard key={index} tweet={tweet} setTweets={setTweets} />
      ))}
    </>
  );
};

export default Home;
