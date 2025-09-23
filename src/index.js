let busy = false;
function beginCooldown(ms = 900) {
   busy = true;
   setTimeout(() => (busy = false), ms);
}

function handleError(err) {
   console.error(err);
   setWait(false);
   formatAnswer("Network error. Please try again.");
}

function clearText() {
   const clearArea = document.querySelector("#result");
   clearArea.textContent = "";
}

function cleanInput() {
   return document.querySelector("#jargon").value.trim().replace(/\s+/g, " ");
}

function setWait(isLoading) {
   const buttonEl = document.querySelector("#translate");
   if (!buttonEl) return;
   buttonEl.disabled = isLoading;
   buttonEl.setAttribute("aria-busy", String(isLoading)); // ← a11y
   buttonEl.textContent = isLoading ? "Waiting..." : "Translate to Corporate";
}

function displayTranslation(response) {
   new Typewriter("#result", {
      strings: response.data.answer,
      autoStart: true,
      delay: 1,
      cursor: "",
   });
   setWait(false);
}

function translateJargon(event) {
   event.preventDefault();
   if (busy) return;
   beginCooldown();

   clearText();
   setWait(true);

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

   axios
      .get(apiUrl)
      .then(displayTranslation)
      .catch(handleError)
      .finally(() => setWait(false));
}

document.querySelector(".toggle").addEventListener("click", () => {
   document.body.classList.toggle("genz");
});

document.querySelector("#translate").addEventListener("click", translateJargon);

document.querySelector("#jargon").addEventListener("keydown", (e) => {
   if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      document.querySelector("#translate").click();
   }
});
