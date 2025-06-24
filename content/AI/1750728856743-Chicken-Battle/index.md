---
title: "A Clash of Titans: Big Chicken vs. Chicken Guy!"
date: 2025-06-24
draft: false
description: "A silly experiment with AI centering on fast food chicken. A culinary showdown is sizzling in the world of celebrity-helmed restaurants as basketball legend Shaquille O'Neal's Big Chicken and celebrity chef Guy Fieri's Chicken Guy! go head-to-head. Both centered around the beloved fried chicken, these establishments offer distinct takes on the classic comfort food. This presentation will dissect their menus, category by category, to reveal the delicious differences and unique offerings that set them apart."
tags: ["AI", "chicken", "shaq", "guy"]
---
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, LoaderCircle } from 'lucide-react';

// --- Data for the Slideshow ---
const slidesData = [
  {
    category: "Chicken Sandwiches",
    geminiFeature: "sandwich",
    comparison: [
      {
        restaurant: "Big Chicken (Shaquille O'Neal)",
        items: [
          { name: "Big & Sloppy", description: "Fried chicken topped with mac & cheese, crispy fried onions, and a roasted garlic BBQ aioli." },
          { name: "Shaq Attack", description: "Fried chicken, pepper jack cheese, jalapeño slaw, and spicy chipotle BBQ sauce." },
          { name: "Uncle Jerome", description: "A classic Nashville Hot chicken sandwich with lettuce, mayo, and pickles." },
          { name: "The Original", description: "Crispy chicken, pickles, and Big Chicken sauce on a brioche bun." },
          { name: "Charles Barkley", description: "Fried chicken, crispy onions, and a sweet & smoky BBQ sauce.", highlighted: true, color: 'text-blue-500' },
          { name: "Crispy Chicken Grilled Cheese", description: "Fried chicken pieces, three cheeses, and chipotle BBQ on Italian bread.", highlighted: true, color: 'text-blue-500' }
        ]
      },
      {
        restaurant: "Chicken Guy! (Guy Fieri)",
        items: [
          { name: "The CG Classic", description: "Crispy fried or GRILLED chicken tenders, pickles, and special sauce." },
          { name: "Bourbon Brown Sugar BBQ", description: "Pepper jack, bourbon brown sugar BBQ sauce, special sauce, slaw, pickles & BBQ kettle chips.", highlighted: true, color: 'text-red-500' },
          { name: "Bacon Jalapeño Popper", description: "Jalapeño cream cheese, bacon, and jalapeños.", highlighted: true, color: 'text-red-500' },
          { name: "Buffalo Mac 'N' Cheese", description: "Mac 'n' cheese, smoked bacon, and buffalo sauce.", highlighted: true, color: 'text-red-500' },
          { name: "Hot Honey", description: "Nashville hot honey, American slaw, and pickles on HOT tenders.", highlighted: true, color: 'text-red-500' },
          { name: "All sandwiches available with Grilled Chicken", description: "A key difference is the option to substitute fried for grilled chicken.", highlighted: true, color: 'text-green-600' }
        ]
      }
    ]
  },
  {
    category: "Chicken Tenders",
    geminiFeature: "sauce",
    comparison: [
      {
        restaurant: "Big Chicken",
        items: [
          { name: "Crispy Chicken Tenders", description: "Available in 3 or 5 piece orders." },
          { name: "Classic Sauce Choices", description: "Served with a choice of Big Chicken Sauce, Shaq Sauce, BBQ, Honey Mustard, or Ranch." }
        ]
      },
      {
        restaurant: "Chicken Guy!",
        items: [
          { name: "Crispy Fried or Grilled Tenders", description: "Available in 3, 4, or 5 piece orders. Tenders can also be ordered 'hot' tossed in seasoning.", highlighted: true, color: 'text-green-600' },
          { name: "The Boss of Sauce (22 Options!)", description: "This is the main differentiator. A massive selection of sauces to choose from.", highlighted: true, color: 'text-purple-500' },
          { name: "Example Sauces", description: "Donkey Sauce, Garlic Parmesan, Nashville Hot Honey, Sweet 'N' Sour, Chipotle Ranch, Avocado Crema, and many more." }
        ]
      }
    ]
  },
  {
    category: "Sides",
    comparison: [
      {
        restaurant: "Big Chicken",
        items: [
          { name: "Lucille's Mac & Cheese", description: "Features a Cheez-It crust." },
          { name: "Dirty Fries", description: "Fries topped with cheese sauce, bacon, banana peppers and chipotle BBQ." },
          { name: "Jalapeño Slaw", description: "A creamy slaw with a spicy kick." },
          { name: "Thick-Cut Fries", description: "Classic seasoned steak fries." }
        ]
      },
      {
        restaurant: "Chicken Guy!",
        items: [
          { name: "Chicken Guy! Fries", description: "Seasoned with a signature fry seasoning." },
          { name: "American Slaw", description: "A classic, non-spicy coleslaw." },
          { name: "Fried Pickle Chips", description: "Served with buttermilk ranch sauce.", highlighted: true, color: 'text-red-500' },
          { name: "Mac Daddy Mac 'N' Cheese", description: "Classic creamy mac and cheese." },
          { name: "Load It Up Option", description: "Ability to add chopped chicken, bacon, and green onions to Fries or Mac.", highlighted: true, color: 'text-red-500' }
        ]
      }
    ]
  },
    {
    category: "Salads",
    comparison: [
      {
        restaurant: "Big Chicken",
        items: [
          { name: "Big Chicken Caesar Salad", description: "A standard Caesar salad with romaine, Parmesan, and croutons. Can be topped with crispy chicken." }
        ]
      },
      {
        restaurant: "Chicken Guy!",
        items: [
          { name: "Guy's Chopped Salad", description: "Romaine, slaw, chickpeas, pepperoncini, cheddar, bacon, tomato, and red onion. Served with Italian dressing.", highlighted: true, color: 'text-red-500' },
          { name: "Fried or Grilled Option", description: "Like the sandwiches and tenders, salads can be topped with either crispy fried or grilled chicken.", highlighted: true, color: 'text-green-600' }
        ]
      }
    ]
  },
  {
    category: "Flavortown Shakes vs. Big Shakes",
    comparison: [
      {
        restaurant: "Big Chicken",
        items: [
          { name: "Classic Flavors", description: "Vanilla, Chocolate, and Strawberry." },
          { name: "Oreo Shake", description: "A popular and classic choice." }
        ]
      },
      {
        restaurant: "Chicken Guy!",
        items: [
          { name: "Classic Flavors", description: "Vanilla, Chocolate, and Strawberry." },
          { name: "Oreo Shake", description: "Also a staple here." },
          { name: "Triple Double Mint", description: "Mint chocolate soft serve, crushed OREO® cookies, and chocolate mints.", highlighted: true, color: 'text-red-500' },
          { name: "Apple Cinnamon Cereal", description: "Vanilla soft serve blended with Cinnamon Toast Crunch™ & Apple Jacks® cereal.", highlighted: true, color: 'text-red-500' }
        ]
      }
    ]
  }
];

// --- Gemini Modal Component ---
const GeminiModal = ({ isOpen, onClose, modalType, onGenerate, isLoading, generatedContent, error }) => {
    const [prompt, setPrompt] = useState('');

    if (!isOpen) return null;

    const modalDetails = {
        sauce: {
            title: "✨ AI Sauce Creator",
            promptLabel: "What flavors are you craving? (e.g., 'sweet and spicy with a hint of citrus')",
            buttonText: "Create a New Sauce"
        },
        sandwich: {
            title: "✨ AI Sandwich Generator",
            promptLabel: "What are some of your favorite ingredients? (e.g., 'avocado, bacon, and chipotle')",
            buttonText: "Invent a Sandwich"
        }
    };

    const details = modalDetails[modalType];

    const handleGenerateClick = () => {
        if (prompt.trim()) {
            onGenerate(prompt);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in-fast">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-2xl transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{details.title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <X size={24} />
                    </button>
                </div>
                
                {!generatedContent && !isLoading && (
                    <>
                        <label htmlFor="gemini-prompt" className="block text-sm font-medium text-gray-600 mb-2">{details.promptLabel}</label>
                        <textarea
                            id="gemini-prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
                            rows="3"
                            placeholder="Type here..."
                        />
                        <button
                            onClick={handleGenerateClick}
                            disabled={isLoading || !prompt.trim()}
                            className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <><LoaderCircle className="animate-spin" /> Generating...</> : details.buttonText}
                        </button>
                    </>
                )}

                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-48">
                        <LoaderCircle size={48} className="animate-spin text-yellow-500" />
                        <p className="mt-4 text-gray-600">The AI is cooking something up...</p>
                    </div>
                )}
                
                {error && <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}

                {generatedContent && (
                    <div className="mt-4 animate-fade-in">
                        <h3 className="text-2xl font-bold text-yellow-600 mb-2">{generatedContent.name}</h3>
                        <p className="text-gray-700 mb-4 italic">{generatedContent.description}</p>
                        <h4 className="font-bold text-gray-800 mb-2">Ingredients:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {generatedContent.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                         <button
                            onClick={onClose}
                            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition-all"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- Slide Component ---
const Slide = ({ data, onGeminiButtonClick }) => {
  return (
    <div className="w-full h-full bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-200 flex flex-col animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">{data.category}</h2>
        {data.geminiFeature && (
            <button onClick={() => onGeminiButtonClick(data.geminiFeature)} className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-full shadow-md hover:bg-yellow-500 transition-all duration-300">
                <Sparkles size={20} />
                {data.geminiFeature === 'sauce' ? 'Create a Sauce' : 'Invent a Sandwich'}
            </button>
        )}
      </div>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {data.comparison.map((col, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-xl border">
            <h3 className="text-2xl font-semibold mb-4 text-center pb-2 border-b-2 border-gray-200">{col.restaurant}</h3>
            <ul className="space-y-3 text-gray-700">
              {col.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex flex-col">
                  <span className={`font-bold ${item.highlighted ? item.color : 'text-gray-900'}`}>{item.name}</span>
                  <span className="text-sm">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'sauce' or 'sandwich'
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };
  
  const handleOpenModal = (type) => {
      setModalType(type);
      setIsModalOpen(true);
      setGeneratedContent(null);
      setError(null);
  };
  
  const handleCloseModal = () => {
      setIsModalOpen(false);
  };

  const handleGenerate = async (userInput) => {
    setIsLoading(true);
    setGeneratedContent(null);
    setError(null);
    
    let prompt;
    const schema = {
        type: "OBJECT",
        properties: {
            "name": { "type": "STRING" },
            "description": { "type": "STRING" },
            "ingredients": {
                "type": "ARRAY",
                "items": { "type": "STRING" }
            }
        },
        required: ["name", "description", "ingredients"]
    };

    if (modalType === 'sauce') {
        prompt = `You are Guy Fieri, the 'Boss of Sauce'. A customer wants a new sauce based on these flavors: "${userInput}". Invent a creative sauce for them. Provide a catchy name, a list of at least 3 ingredients, and a short, punchy description in your signature style.`;
    } else { // sandwich
        prompt = `You are a creative chef designing a new chicken sandwich. A customer wants a sandwich that includes these flavors or ingredients: "${userInput}". Invent a new chicken sandwich concept. Give it a catchy name in the style of 'Big Chicken' or 'Chicken Guy!'. Provide the name, a list of at least 4 ingredients (including chicken), and a mouth-watering description.`;
    }

    try {
        const payload = {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
          }
        };

        const apiKey = ""; // Leave empty for automatic injection
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const parsedJson = JSON.parse(result.candidates[0].content.parts[0].text);
            setGeneratedContent(parsedJson);
        } else {
            console.error("Unexpected API response structure:", result);
            throw new Error("Failed to parse the response from the AI. It might be feeling uninspired!");
        }

    } catch (err) {
        console.error("Gemini API call failed:", err);
        setError(err.message || "Something went wrong. The AI might be on a lunch break. Please try again later.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.5s ease-in-out; }
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-fast { animation: fade-in-fast 0.3s ease-in-out; }
      `}</style>

      <GeminiModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modalType={modalType}
        onGenerate={handleGenerate}
        isLoading={isLoading}
        generatedContent={generatedContent}
        error={error}
      />

      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-gray-900">Big Chicken vs. Chicken Guy!</h1>
        <p className="text-center text-gray-600 mb-8">A Menu Showdown</p>

        <div className="relative mb-6" style={{ minHeight: '60vh' }}>
            <Slide data={slidesData[currentSlide]} onGeminiButtonClick={handleOpenModal} />
        </div>

        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <button
            onClick={prevSlide}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          <div className="text-gray-600 font-medium">
            {currentSlide + 1} / {slidesData.length}
          </div>
          <button
            onClick={nextSlide}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
