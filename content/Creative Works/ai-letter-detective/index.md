---
title: "AI Letter Detective"
date: 2026-02-04
draft: true
description: "Game to Replicate Informed Guessing Like AI Does"
layout: "simple"
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Letter Detective</title>
    <style>
        .ai-detective-game * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .ai-detective-game {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        .ai-detective-container {
            background: white;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border: 1px solid #e5e7eb;
        }
        .ai-detective-title {
            color: #0f172a;
            text-align: center;
            font-size: 2.25rem;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.025em;
        }
        .ai-detective-subtitle {
            text-align: center;
            color: #475569;
            font-size: 1rem;
            margin-bottom: 32px;
            font-weight: 500;
        }
        .ai-detective-level-selector {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-bottom: 32px;
            flex-wrap: wrap;
        }
        .ai-detective-level-btn {
            padding: 10px 24px;
            border: 2px solid #cbd5e1;
            border-radius: 8px;
            background: white;
            color: #475569;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ai-detective-level-btn:hover {
            border-color: #3b82f6;
            color: #3b82f6;
            transform: translateY(-1px);
        }
        .ai-detective-level-btn.active {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            border-color: #3b82f6;
            color: white;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
        .ai-detective-instructions {
            background: #eff6ff;
            padding: 20px 24px;
            border-radius: 12px;
            margin-bottom: 24px;
            border-left: 4px solid #3b82f6;
            color: #334155;
            font-size: 0.95rem;
        }
        .ai-detective-instructions strong {
            color: #0f172a;
            font-weight: 600;
        }
        .ai-detective-prompt-box {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            padding: 20px 24px;
            border-radius: 12px;
            margin-bottom: 24px;
            border: 2px solid #f59e0b;
            box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);
        }
        .ai-detective-prompt-label {
            font-size: 0.85rem;
            font-weight: 600;
            color: #92400e;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
        }
        .ai-detective-prompt-text {
            font-size: 1.1rem;
            color: #78350f;
            font-weight: 500;
            font-style: italic;
            display: none;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #fbbf24;
        }
        .ai-detective-prompt-text.revealed {
            display: block;
            animation: ai-detective-fadeIn 0.3s ease;
        }
        @keyframes ai-detective-fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .ai-detective-reveal-btn {
            padding: 8px 20px;
            border: 2px solid #f59e0b;
            border-radius: 8px;
            background: white;
            color: #92400e;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ai-detective-reveal-btn:hover {
            background: #fef3c7;
            transform: translateY(-1px);
        }
        .ai-detective-reveal-btn.hidden {
            display: none;
        }
        .ai-detective-letter-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
            gap: 8px;
            margin: 24px 0;
            padding: 24px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            max-width: 100%;
        }
        .ai-detective-letter-box {
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1.25rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
            user-select: none;
            color: #334155;
        }
        .ai-detective-letter-box:hover {
            transform: translateY(-2px);
            border-color: #3b82f6;
            box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
        }
        .ai-detective-letter-box.found {
            background: #3b82f6;
            border-color: #3b82f6;
            color: white;
            animation: ai-detective-pulse 0.3s ease;
        }
        .ai-detective-letter-box.wrong {
            background: #ef4444;
            border-color: #ef4444;
            color: white;
            animation: ai-detective-shake 0.3s ease;
        }
        @keyframes ai-detective-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        @keyframes ai-detective-shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
        }
        .ai-detective-message-display {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            padding: 24px;
            border-radius: 12px;
            margin: 24px 0;
            min-height: 70px;
            font-size: 1.5rem;
            text-align: center;
            font-weight: 600;
            color: #1e40af;
            border: 2px solid #3b82f6;
            letter-spacing: 0.05em;
        }
        .ai-detective-stats {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin: 24px 0;
            flex-wrap: wrap;
        }
        .ai-detective-stat-box {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 16px 28px;
            border-radius: 12px;
            text-align: center;
            min-width: 140px;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .ai-detective-stat-label {
            font-size: 0.875rem;
            opacity: 0.95;
            font-weight: 500;
            margin-bottom: 4px;
        }
        .ai-detective-stat-value {
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -0.025em;
        }
        .ai-detective-ai-info {
            background: #f0f9ff;
            padding: 24px;
            border-radius: 12px;
            margin-top: 32px;
            border-left: 4px solid #0284c7;
            color: #075985;
        }
        .ai-detective-ai-info h3 {
            color: #0c4a6e;
            margin-bottom: 16px;
            font-size: 1.25rem;
            font-weight: 700;
        }
        .ai-detective-ai-info p {
            margin-bottom: 12px;
            color: #075985;
            font-size: 0.95rem;
            line-height: 1.7;
        }
        .ai-detective-ai-info p:last-child {
            margin-bottom: 0;
        }
        .ai-detective-ai-info strong {
            font-weight: 600;
            color: #0c4a6e;
        }
        .ai-detective-btn-reset {
            display: block;
            margin: 24px auto;
            padding: 12px 32px;
            border: none;
            border-radius: 8px;
            background: #3b82f6;
            color: white;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .ai-detective-btn-reset:hover {
            background: #2563eb;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }
        .ai-detective-completion-message {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 32px;
            border-radius: 12px;
            text-align: center;
            font-size: 1.15rem;
            animation: ai-detective-slideIn 0.4s ease;
            box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
            line-height: 1.8;
        }
        @keyframes ai-detective-slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="ai-detective-game">
        <div class="ai-detective-container">
            <h1 class="ai-detective-title">AI Letter Detective</h1>
            <p class="ai-detective-subtitle">Discover hidden messages by detecting letter patterns—just like AI does</p>
            
            <div class="ai-detective-level-selector">
                <button class="ai-detective-level-btn active" onclick="aiDetectiveSetLevel(1)">Level 1: Easy</button>
                <button class="ai-detective-level-btn" onclick="aiDetectiveSetLevel(2)">Level 2: Medium</button>
                <button class="ai-detective-level-btn" onclick="aiDetectiveSetLevel(3)">Level 3: Hard</button>
            </div>

            <div class="ai-detective-instructions">
                <strong>Your Mission:</strong> AI learns by finding patterns in letters and words. Click on letters in order to reveal the hidden message. The most common letters in English are highlighted throughout the grid—just like how AI uses statistical patterns to understand language.
            </div>

            <div class="ai-detective-prompt-box">
                <div class="ai-detective-prompt-label">User Prompt (Your Clue):</div>
                <button class="ai-detective-reveal-btn" id="ai-detective-reveal-btn" onclick="aiDetectiveRevealPrompt()">Reveal Clue</button>
                <div class="ai-detective-prompt-text" id="ai-detective-prompt-text">Loading prompt...</div>
            </div>

            <div class="ai-detective-stats">
                <div class="ai-detective-stat-box">
                    <div class="ai-detective-stat-label">Letters Found</div>
                    <div class="ai-detective-stat-value" id="ai-detective-found-count">0</div>
                </div>
                <div class="ai-detective-stat-box">
                    <div class="ai-detective-stat-label">Total Letters</div>
                    <div class="ai-detective-stat-value" id="ai-detective-total-count">0</div>
                </div>
                <div class="ai-detective-stat-box">
                    <div class="ai-detective-stat-label">Mistakes</div>
                    <div class="ai-detective-stat-value" id="ai-detective-mistakes">0</div>
                </div>
            </div>

            <div class="ai-detective-message-display" id="ai-detective-message-display">
                Find the letters to reveal the message
            </div>

            <div class="ai-detective-letter-grid" id="ai-detective-letter-grid"></div>

            <button class="ai-detective-btn-reset" onclick="aiDetectiveResetGame()">New Message</button>

            <div class="ai-detective-ai-info">
                <h3>How This Connects to AI</h3>
                <p><strong>Letter Frequency:</strong> AI language models learn which letters and words appear most often together. In English, letters like E, T, A, and O are very common. AI uses these patterns to predict what word should come next.</p>
                <p><strong>Statistical Patterns:</strong> Just like you're finding patterns in this letter grid, AI finds patterns in millions of sentences to learn how language works. It counts how often words appear together and uses mathematics to make informed predictions about what to say next.</p>
                <p><strong>Training Data:</strong> The more examples AI sees, the better it becomes—just like how finding more letters helps you see the message more clearly. AI improves its predictions by analyzing vast amounts of text.</p>
            </div>
        </div>
    </div>

    <script>
        (function() {
            let aiDetectiveCurrentLevel = 1;
            let aiDetectiveMessages = {
                1: [
                    {text: "AI LEARNS FROM PATTERNS", prompt: "How does AI learn?"},
                    {text: "ROBOTS USE STATISTICS", prompt: "What do robots use to think?"},
                    {text: "DATA HELPS AI THINK", prompt: "What helps AI think?"},
                    {text: "COMPUTERS COUNT WORDS", prompt: "What do computers count?"},
                    {text: "AI NEEDS LOTS OF DATA", prompt: "What does AI need?"},
                    {text: "PATTERNS TEACH MACHINES", prompt: "What teaches machines?"}
                ],
                2: [
                    {text: "AI LEARNS BY READING TEXT", prompt: "How does AI learn language?"},
                    {text: "COMPUTERS FIND WORD PATTERNS", prompt: "What do computers find in text?"},
                    {text: "DATA TRAINS AI TO PREDICT", prompt: "What trains AI?"},
                    {text: "AI COUNTS COMMON WORDS", prompt: "What does AI count in sentences?"},
                    {text: "MACHINES LEARN FROM EXAMPLES", prompt: "How do machines learn?"},
                    {text: "PATTERNS HELP AI UNDERSTAND", prompt: "What helps AI understand language?"}
                ],
                3: [
                    {text: "AI USES MATH TO PREDICT THE NEXT WORD", prompt: "How does AI predict words?"},
                    {text: "COMPUTERS COUNT PATTERNS IN SENTENCES", prompt: "What do computers count?"},
                    {text: "AI LEARNS FROM MILLIONS OF EXAMPLES", prompt: "What does AI learn from?"},
                    {text: "MACHINES USE STATISTICS TO WRITE TEXT", prompt: "How do machines write text?"},
                    {text: "AI FINDS PATTERNS TO MAKE PREDICTIONS", prompt: "How does AI make predictions?"},
                    {text: "TRAINING DATA TEACHES AI HOW TO TALK", prompt: "What teaches AI to communicate?"}
                ]
            };
            
            let aiDetectiveCurrentMessage = "";
            let aiDetectiveCurrentPrompt = "";
            let aiDetectiveMessageLetters = [];
            let aiDetectiveGridLetters = [];
            let aiDetectiveCurrentPosition = 0;
            let aiDetectiveMistakes = 0;
            let aiDetectiveCommonLetters = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R'];

            window.aiDetectiveSetLevel = function(level) {
                aiDetectiveCurrentLevel = level;
                document.querySelectorAll('.ai-detective-level-btn').forEach((btn, idx) => {
                    btn.classList.toggle('active', idx + 1 === level);
                });
                aiDetectiveResetGame();
            }

            function aiDetectiveInitGame() {
                const levelMessages = aiDetectiveMessages[aiDetectiveCurrentLevel];
                const selected = levelMessages[Math.floor(Math.random() * levelMessages.length)];
                aiDetectiveCurrentMessage = selected.text;
                aiDetectiveCurrentPrompt = selected.prompt;
                aiDetectiveMessageLetters = aiDetectiveCurrentMessage.split('');
                aiDetectiveCurrentPosition = 0;
                aiDetectiveMistakes = 0;
                
                document.getElementById('ai-detective-prompt-text').textContent = aiDetectiveCurrentPrompt;
                
                const gridSize = aiDetectiveCurrentLevel === 1 ? 60 : aiDetectiveCurrentLevel === 2 ? 80 : 100;
                aiDetectiveGridLetters = [...aiDetectiveMessageLetters];
                
                while (aiDetectiveGridLetters.length < gridSize) {
                    const randomLetter = aiDetectiveCommonLetters[Math.floor(Math.random() * aiDetectiveCommonLetters.length)];
                    aiDetectiveGridLetters.splice(Math.floor(Math.random() * aiDetectiveGridLetters.length), 0, randomLetter);
                }
                
                aiDetectiveRenderGrid();
                aiDetectiveUpdateStats();
                aiDetectiveUpdateMessage();
            }

            function aiDetectiveRenderGrid() {
                const grid = document.getElementById('ai-detective-letter-grid');
                grid.innerHTML = '';
                
                const columns = aiDetectiveCurrentLevel === 1 ? 10 : aiDetectiveCurrentLevel === 2 ? 12 : 14;
                grid.style.gridTemplateColumns = `repeat(${columns}, 45px)`;
                
                aiDetectiveGridLetters.forEach((letter, index) => {
                    const box = document.createElement('div');
                    box.className = 'ai-detective-letter-box';
                    box.textContent = letter;
                    box.onclick = () => aiDetectiveClickLetter(index, letter);
                    box.dataset.index = index;
                    grid.appendChild(box);
                });
            }

            function aiDetectiveClickLetter(index, letter) {
                const box = document.querySelectorAll('.ai-detective-letter-box')[index];
                
                if (box.classList.contains('found')) return;
                
                if (letter === aiDetectiveMessageLetters[aiDetectiveCurrentPosition]) {
                    box.classList.add('found');
                    aiDetectiveCurrentPosition++;
                    aiDetectiveUpdateMessage();
                    aiDetectiveUpdateStats();
                    
                    if (aiDetectiveCurrentPosition === aiDetectiveMessageLetters.length) {
                        setTimeout(aiDetectiveShowCompletion, 500);
                    }
                } else {
                    aiDetectiveMistakes++;
                    box.classList.add('wrong');
                    setTimeout(() => box.classList.remove('wrong'), 500);
                    aiDetectiveUpdateStats();
                }
            }

            function aiDetectiveUpdateMessage() {
                const display = document.getElementById('ai-detective-message-display');
                let displayText = '';
                
                for (let i = 0; i < aiDetectiveMessageLetters.length; i++) {
                    if (i < aiDetectiveCurrentPosition) {
                        displayText += aiDetectiveMessageLetters[i];
                    } else {
                        displayText += aiDetectiveMessageLetters[i] === ' ' ? ' ' : '_';
                    }
                }
                
                display.textContent = displayText || 'Find the letters to reveal the message';
            }

            function aiDetectiveUpdateStats() {
                document.getElementById('ai-detective-found-count').textContent = aiDetectiveCurrentPosition;
                document.getElementById('ai-detective-total-count').textContent = aiDetectiveMessageLetters.length;
                document.getElementById('ai-detective-mistakes').textContent = aiDetectiveMistakes;
            }

            function aiDetectiveShowCompletion() {
                const display = document.getElementById('ai-detective-message-display');
                display.innerHTML = `
                    <div class="ai-detective-completion-message">
                        <strong>Excellent Work, Detective!</strong><br>
                        Message Revealed: "${aiDetectiveCurrentMessage}"<br>
                        Mistakes: ${aiDetectiveMistakes}
                    </div>
                `;
            }

            window.aiDetectiveResetGame = function() {
                document.getElementById('ai-detective-message-display').textContent = 'Find the letters to reveal the message';
                document.getElementById('ai-detective-prompt-text').classList.remove('revealed');
                document.getElementById('ai-detective-reveal-btn').classList.remove('hidden');
                aiDetectiveInitGame();
            }

            window.aiDetectiveRevealPrompt = function() {
                document.getElementById('ai-detective-prompt-text').classList.add('revealed');
                document.getElementById('ai-detective-reveal-btn').classList.add('hidden');
            }

            aiDetectiveInitGame();
        })();
    </script>
</body>
</html>