# Dragon Repeller: a browser RPG

A small text-and-buttons role-playing game that runs in the browser. You start in a town with 100 health and 50 gold, and have to defeat the dragon that is
blocking the way out. Plain HTML, CSS and JavaScript: no dependencies.

**Play it:** open `index.html` in any browser.

## How to play

| Place | What you can do |
|---|---|
| Town square | Go to the store, go to the cave, or fight the dragon |
| Store | Buy 10 health for 10 gold, buy a better weapon for 30 gold, or sell an old weapon for 15 gold (you cannot sell your only weapon) |
| Cave | Fight a **slime** (level 2, 15 HP) or a **fanged beast** (level 8, 60 HP) to earn XP and gold |
| Dragon | Level 20, 300 HP. Defeat it to win |
| Easter egg | A hidden number-picking mini-game |

Weapons upgrade in order: **stick** (power 5) → **dagger** (30) → **claw hammer** (50) → **sword** (100). If your health reaches 0 you lose and can restart.

## Features

- Game state (XP, health, gold, weapon, inventory) tracked in plain JavaScript variables and shown in a live stats bar
- Data-driven scenes: each location is an object with its text and button handlers, so adding a place means adding one entry
- Combat with monster stats, weapon damage and a chance for your weapon to break
- Win, lose and restart flow

## Files

| File | Purpose |
|---|---|
| `index.html` | Layout: stats bar, three action buttons, monster panel, story text |
| `styles.css` | Styling |
| `script.js` | All game logic (about 340 lines) |

## Ideas for next steps

Save progress in `localStorage`, add more monsters and locations, balance the numbers, and add keyboard controls.

## Credit

Inspired by the freeCodeCamp "Dragon Repeller" JavaScript project. I built and modified it as JavaScript practice (DOM updates, arrays of objects, functions as data).
