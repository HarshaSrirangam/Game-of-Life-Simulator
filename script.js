body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* GitHub-like font */
    margin: 0;
    padding: 20px;
    background-color: #fafbfc; /* Light background for a clean GitHub-like look */
    color: #333; /* Dark text color for readability */
}
.container {
    display: flex;
    align-items: flex-start;
    gap: 20px;
}
#grid {
    display: grid;
    grid-template-columns: repeat(20, 30px);
    grid-template-rows: repeat(20, 30px);
    gap: 2px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
}
.cell {
    width: 30px;
    height: 30px;
    background-color: #ddd;
    border: 1px solid #999;
}
.activateCell {
    background-color: black;
}
.controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
button {
    padding: 10px 20px; 
    font-size: 14px; 
    font-weight: 600; 
    color: white;
    background-color: #2c2f36; 
    border: 1px solid #444; 
    border-radius: 6px; 
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
}

button:hover {
    background-color: #444d56; 
    transform: scale(1.05);
}

button:focus {
    outline: none; 
}

button:active {
    background-color: #3e444d;
    transform: scale(0.98); 
}

button:disabled {
    background-color: #a1a1a1;
    cursor: not-allowed;
}
