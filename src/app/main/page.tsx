"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import SearchForm from "@/components/SearchForm";
import { type Document } from "../types/document";
import { sanitizeString } from "@/lib/utils";
import LoadingComponent from "@/components/LoadingComponent";
import LoadingSpinner from "@/components/LoadingSpinner";
import DescriptionModal from "@/components/DescriptionModal";
interface SearchResult {
  metadata: Document["metadata"];
  content: string;
}

const runBootstrapProcedure = async () => {
  const response = await fetch("/api/bootstrap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.json();
    console.log(body);
    throw new Error(`API request failed with status ${response.status}`);
  }
};

const checkAndBootstrapIndex = async (
  setIsBootstrapping: (isBootstrapping: boolean) => void,
  setIsIndexReady: (isIndexReady: boolean) => void
) => {
  setIsBootstrapping(true);
  await runBootstrapProcedure();
  setIsBootstrapping(false);
  setIsIndexReady(true);
};

const handleSearch = async (
  query: string,
  setResults: (results: SearchResult[]) => void,
  setIsSearching: (isSearching: boolean) => void
) => {
  setIsSearching(true);
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const body = await response.json();
    console.log(body);
    throw new Error(`API request failed with status ${response.status}`);
  }

  const { results } = await response.json();
  setResults(results);
  setIsSearching(false);
};

const suggestedSearches = [
  "Cases about personal freedoms being violated",
  "Cases involving a US President",
  "Cases involving guns",
  "Cases where Nixon was the defendant",
  "How much power does the commerce clause give Congress?",
  "Cases about personal rights or congressional overreach?",
  "Cases involving the ability to pay for an attorney",
  "Cases about the right to remain silent",
  "Landmark cases that shaped freedom of speech laws",
  "Cases where defendant was found with a gun",
  "What cases involved personal rights or congressional overreach?",
  "Cases where the judge expressed grave concern",
];

export default function Home() {
  const [isBootstrapping, setIsBootstrapping] = useState(false);
  const [isIndexReady, setIsIndexReady] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<SearchResult | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    checkAndBootstrapIndex(setIsBootstrapping, setIsIndexReady);
  }, []);

  const clearResults = () => {
    setQuery("");
    setResults([]);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center w-full mb-8">
          {isBootstrapping && (
            <LoadingComponent/>
          )}
        </div>

        {isIndexReady && !isBootstrapping && (
          <div className="w-full">
            <div className="max-w-3xl mx-auto mb-12">
              <SearchForm
                suggestedSearches={suggestedSearches}
                onSearch={(query: string) => {
                  handleSearch(query, setResults, setIsSearching);
                  setQuery(query);
                }}
              />
            </div>

            {isSearching && (
              <div className="flex justify-center mb-8">
                <LoadingSpinner/>
              </div>
            )}

            {results.length > 0 && query && (
              <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">
                  Found {results.length} result{results.length > 1 ? "s" : ""}{" "}
                  for{" "}
                  <span className="font-semibold text-indigo-600">
                  &ldquo;{query}&ldquo;
                  </span>
                </p>
                <button
                  onClick={clearResults}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear results"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <Card
                  key={index}
                  className="bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => {
                    setSelectedDocument(result);
                    setOpenModal(true);
                  }}
                >
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">
                      {result.metadata.title}
                    </h2>
                    <blockquote className="relative p-4 mb-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 line-clamp-4 italic">
                        {sanitizeString(result.metadata.pageContent)}
                      </p>
                    </blockquote>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 w-20">
                          Date:
                        </span>
                        <span>
                          {new Date(result.metadata.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      {openModal && selectedDocument && (
      <div className="transition duration-700 ease-in-out">
        <DescriptionModal
          document={selectedDocument}
          quote={selectedDocument?.metadata.pageContent}
          onClose={() => setOpenModal(false)}
        />
      </div>
      )}
    </div>
  );
}
