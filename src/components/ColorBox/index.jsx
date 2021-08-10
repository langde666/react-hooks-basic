import React, { useState } from 'react';

function getRandomColor(currentColor) {
    const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue'];
    
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * 5);
    }
    while (COLOR_LIST[randomIndex] === currentColor);

    return COLOR_LIST[randomIndex];
}

function ColorBox() {
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box_color') || 'deeppink';
        return initColor;
    });

    const handleBoxClick = () => {
        //get random color
        //set color from
        const newColor = getRandomColor(color);
        setColor(newColor);

        localStorage.setItem('box_color', newColor);
    };

    return (
        <div
            className="color-box"
            style={{ backgroundColor: color, color: 'white' }}
            onClick={handleBoxClick}
        >
            COLOR BOX
        </div>
    );
}

export default ColorBox;