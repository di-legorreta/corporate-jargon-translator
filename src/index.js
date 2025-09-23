document.querySelector(".toggle").addEventListener("click", () => {
   document.body.classList.toggle("genz");
});

function translateJargon(event) {
   event.preventDefault();

   new Typewriter("#result", {
      strings: "That task doesn't fall under my responsability",
      autoStart: true,
      delay: "natural",
      cursor: "",
   });
}

let inputEl = document.querySelector("#translate");
inputEl.addEventListener("click", translateJargon);
