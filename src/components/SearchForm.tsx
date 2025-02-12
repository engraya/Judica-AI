import { useState, ChangeEvent, FormEvent } from 'react';

interface SearchFormProps {
  suggestedSearches: string[];
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ suggestedSearches, onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions] = useState<string[]>(suggestedSearches);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setQuery("");
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleClear = () => {
    setQuery("");
    setShowSuggestions(true);
  };

  return (
    <div className="w-full max-w-2xl gap-4 mx-auto">
       <div
      className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
    >
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-3 sm:p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex text-lg font-semibold text-black">
          Explore with Popular Suggestion Searches
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 pb-5 sm:px-6 sm:pb-6">
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute mt-2 bg-white  shadow-lg max-h-60 overflow-y-auto z-10">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                onClick={() => {
                  setQuery(suggestion)
                  setIsOpen(!isOpen)
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        </div>
      )}
    </div>
      <div className="max-w-full flex-shrink-0 mt-3 text-center">
            <div className="w-full">
              <form onSubmit={handleSubmit} className="relative sm:flex sm:items-center">
                <input
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search legal docs or view suggestions"
                />
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute top-1/2 transform -translate-y-1/2 right-14 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
               )}
              </form>
            </div>
            <div className="mt-5 flex items-center justify-center gap-x-6">
              <div className="flex flex-wrap justify-center gap-6">
                <div
                  className={`submitDiv relative cursor-pointer ${!query ? 'opacity-50 pointer-events-none' : ''}`}
                      // @ts-ignore
                  onClick={() => handleSubmit(new Event("submit"))} 
                >
                  <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700" />
                  <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-gray-900 hover:text-yellow-500">
                    Search →
                  </span>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default SearchForm;
