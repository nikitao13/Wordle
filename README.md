
# Wordle

Wordle Game for General Assembly Course

  

# Technology used

* HTML

* CSS

* Javascript

  

# Game: Wordle / Treasure Hunt

* Classic *"Wordle"* game-mode

* Addition of side-game called *"Treasure Hunt"*

  

Guessing a correct letter (letter is within secret word) will result in that letter being hightlighted **ORANGE**.

If the letter is in the correct spot, it will be highlighted **GREEN**.

Successful treasure hunts (finding all 3 treasure chests) result in user winning a *hint* for the Wordle game-mode.

Using a *hint* will reveal 1 letter found in the secret word. A user may use a maximum of **3** hints during a Wordle game.

  

# Problems encountered

* I had some troubles initially figuring out how I was going to move through each row of squares as the game progressed

* This included the problem of ensuring the *backspace* key was limited to **only** the current row

* I also had some difficulties implementing responsive CSS with media queries and getting grid proportions to work as expected

* I found a bug where backspace was double-pressing sometimes, especially on mobile

  

I figured I would have to have a variable that stores the current *row number*, so I used **rowNum** to hold that value.

Then, everytime a user inputs a 5 letter combination that is a valid word, this **rowNum** value is *incremeneted*.

When retrieving the user selection, the **chosenWord** is determined based on what the **rowNum** value is currently.

* For example, if **rowNum** === 1, it will iterate through squares 0 - 4.

* And if **rowNum** === 2, it will iterate through squares 5 - 9.

  
```
if (row === 1) {
	for (let x = 0; x < 5; x++) {
	chosenWord += squares[x].textContent;
	}
} else if (row === 2) {
	for (let x = 5; x < 10; x++) {
	chosenWord += squares[x].textContent;
	}
}
  ```

For the backspace function, I utilized the already existing **i** counter. This counter tracks the index of inputted letters and their respective squares.

* For example, if **rowNum** === 1, the last square would be squares[i - 1].

* And if **rowNum** === 2, the last square would be squares[i + 5 - 1].

  
```
if (i > 0 && rowNum === 1) {
	squares[i -1].textContent = "";
	i--;
}
if (i > 0 && rowNum === 2) {
	squares[i + 5 -1].textContent = "";
	i--;
}
```

I also faced a bug where my backspace key would fire twice every now and then. This was especially prevelant on the mobile view.

I had used an img within the backspace button, and had to add **eventListeners** to them both to make the key fire every time.

I had a feeling this is where my problem came from.

* Initially I thought to just make the img take up 100% of the space of the button, but this was leading to sizing issues on the keyboard.

* After some googling I discovered that I could use **event.stopPropagation()** to stop both elements from firing.
```
function backspace(event) {
	event.stopPropagation();
}
```
 
This seemed to fix the issue. Now when clicked only 1 eventListener fires.



# Fun parts

* Coming up with a second game to incorporate into the original Wordle grid

* Integrating the game into Wordle to enable winning of hints

* Finding suitable color palletes for CSS

* Figuring out game logic

* Trying to make things work as expected

  

# Future improvement

There are some improvements I would like to implement in the future to this code.

  

**Game State**

* I'm quite sure my way of changing from **Wordle** to **Treasure Hunt** and vice versa is not optimal

* I would like to store the game state in a better way, possibly simply in a variable e.g WordleMode = True, or even better as an object

* This would also help to make sure that hints etc. aren't lost when swapping game modes mid-game

  

**HTML/CSS Styling and Organization**

* I had some very messy ways of using **IDs** for squares and keys

* I would like to organize my HTML and CSS to utilize *classes* more to tidy things up

* My webpage layout has room for improvement, I would like things to fill the page better and scale with screen size changes in a cleaner way

  

**Storing Values**

* In my code I used a lot of global variables mainly for counters etc.

* In the future I would like to reduce the number of global variables as this can cause problems

* Rather I would like to utilize objects and passing arguments to functions more