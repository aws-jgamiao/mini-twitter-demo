import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

interface Tweet {
  id: string;
  text: string;
  user: string;
  timestamp: Date;
}

const TweetFeed: React.FC = () => {
  const [tweet, setTweet] = useState<string>("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "tweets"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTweets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tweet)));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const postTweet = async () => {
    if (!tweet.trim() || !user) return alert("You must be logged in to tweet!");

    try {
      await addDoc(collection(db, "tweets"), {
        text: tweet,
        user: user.email, // Show authenticated user's email
        timestamp: new Date(),
      });
      setTweet("");
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      {user ? (
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="What's happening?"
            className="border p-2 flex-grow"
          />
          <button onClick={postTweet} className="bg-blue-500 text-white p-2 rounded">
            Tweet
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">Login to tweet.</p>
      )}
      <div>
        {tweets.map((t) => (
          <div key={t.id} className="border-b p-2">
            <p className="font-bold">{t.user}</p>
            <p>{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetFeed;
