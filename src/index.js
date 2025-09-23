document.querySelector(".toggle").addEventListener("click", () => {
   document.body.classList.toggle("genz");
});

function displayTranslation(response) {
   console.log("translation");
   new Typewriter("#result", {
      strings: response.data.answer,
      autoStart: true,
      delay: 1,
      cursor: "",
   });
}

function translateJargon(event) {
   event.preventDefault();

   const bluntEl = document.querySelector("#jargon");
   const apiKey = "297bdob5643aebcfc422bc019b792eta";
   const context =
      "You are a Corporate AI Translator. Your job is to turn blunt or informal phrases into concise, professional business communication." +
      "Keep the original intent (boundaries, timelines, scope) but use neutral, constructive wording." +
      "Prefer active voice; avoid sarcasm, shaming, and blame." +
      "No disclaimers like 'As an AI…'" +
      "If the input is unsafe or asks for harassment, respond with a brief, professional boundary statement." +
      "Style is Clear, direct, respectful, solution-oriented.";
   const prompt = `Translate ${bluntEl.value} into Corporate jargon.`;
   const apiUrl =
      "https://api.shecodes.io/ai/v1/generate" +
      "?prompt=" +
      encodeURIComponent(prompt) +
      "&context=" +
      encodeURIComponent(context) +
      "&key=" +
      encodeURIComponent(apiKey);

   console.log("Translating");
   console.log(` ${prompt}`);
   console.log(` ${context}`);

   axios.get(apiUrl).then(displayTranslation);
}

const inputEl = document.querySelector("#translate");
inputEl.addEventListener("click", translateJargon);
