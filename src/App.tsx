import React, { useState } from "react";
import Auth from "./components/Auth";
import TweetFeed from "./components/TweetFeed";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Mini Twitter</h1>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-blue-600 px-3 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {user.email}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">                
                <button
                  onClick={() => {
                    setUser(null);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : null}
      </header>

      <div className="container mx-auto mt-6">
        {user ? <TweetFeed /> : <Auth setUser={setUser} user={user} />}
      </div>
    </div>
  );
};

export default App;
