const cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
];

const memoryGame = new MemoryGame(cards);

window.addEventListener("load", (event) => {
  let html = "";
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector("#memory-board").innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      // TODO: write some code here

      card.classList.add("turned");
      console.log(`Card clicked: ${card}`);

      let allcards = document.querySelectorAll(".card");
      let flippedCards = 0;
      let card1;
      let card2;

      for (let i = 0; i < allcards.length; i++) {
        // check if we have 2 cards flipped
        if (
          allcards[i].classList.contains("turned") &&
          !allcards[i].classList.contains("blocked")
        ) {
          flippedCards++;
          if (flippedCards == 1) {
            card1 = allcards[i];
          } else if (flippedCards == 2) {
            card2 = allcards[i];
          }
        }
      }

      if (flippedCards == 2) {
        //  if I have 2 cards check if they are equals
        if (
          memoryGame.checkIfPair(
            card1.getAttribute("data-card-name"),
            card2.getAttribute("data-card-name")
          )
        ) {
          card1.classList.add("blocked");
          card2.classList.add("blocked");
        } else {
          // remove the turned class, let's keep only blocked
          setTimeout(() => {
            for (let i = 0; i < allcards.length; i++) {
              // check if we have 2 cards flipped
              if (
                allcards[i].classList.contains("turned") &&
                !allcards[i].classList.contains("blocked")
              ) {
                allcards[i].classList.remove("turned");
              }
            }
          }, 1000);
        }
        //console.log(memoryGame.pairsClicked);
        //console.log(memoryGame.pairsGuessed);
      }

      if (memoryGame.checkIfFinished()) {
        location.reload();
      }
    });
  });
});
