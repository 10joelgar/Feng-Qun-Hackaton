const API_KEY = "POSAR_LA_CLAU";

document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  if (!chatForm) return;

  // Local knowledge base for standalone/fallback operations
  const localKnowledge = [
    { keywords: ['recept', 'cuinar', 'plat'], answer: "Et recomano provar el nostre Gaspatxo de Síndria UPC o l'Amanida fresca de Tomàquet i Cogombre. Són km0 i ideals per reduir el malbaratament!" },
    { keywords: ['tomàquet', 'tomaquet', 'tomat'], answer: "Els nostres tomàquets estan en fase d'alta maduració. Ideals per amanides. S'han de regar per goteig cada matí." },
    { keywords: ['plantar', 'cultiu', 'començar'], answer: "Per començar a plantar al campus, recomanem preparar la terra amb compost orgànic i connectar el sistema de reg per goteig eficient." },
    { keywords: ['nutricio', 'salut', 'benefici'], answer: "Les mongetes verdes són riques en fibra i vitamines A i C. Les albergínies aporten excel·lents antioxidants." },
    { keywords: ['malbaratament', 'llençar', 'sobres'], answer: "Si et sobren verdures, pots fer cremes fredes o congelar-les tallades al buit. L'hort de la UPC recolza el residu zero!" }
  ];

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    appendMessage('user', query);
    chatInput.value = '';

    // Show typing state
    const typingId = appendMessage('ai', '<div class="spinner"></div>');

    if (API_KEY === "POSAR_LA_CLAU" || API_KEY.trim() === "") {
      // Simulate intelligent local fallback response after brief delay
      setTimeout(() => {
        let responseText = "Interessant pregunta sobre l'hort del campus UPC. Com que estem en mode local, et puc dir que apostem totalment per l'agricultura de precisió i ecològica.";
        const lowerQuery = query.toLowerCase();
        
        for (const item of localKnowledge) {
          if (item.keywords.some(kw => lowerQuery.includes(kw))) {
            responseText = item.answer;
            break;
          }
        }
        updateMessage(typingId, responseText);
      }, 800);
    } else {
      // Connect to official OpenAI API endpoint
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "Ets l'assistent virtual intel·ligent de l'Hort Ecològic del campus UPC CAMP de Castelldefels. Ajuda els usuaris amb receptes optimitzades per a l'estoc, mètodes de plantació, dades nutricionals, i reducció de malbaratament alimentari. Respon clarament." },
              { role: "user", content: query }
            ]
          })
        });
        const data = await response.json();
        const reply = data.choices[0].message.content;
        updateMessage(typingId, reply);
      } catch (error) {
        updateMessage(typingId, "Error de connexió amb la intel·ligència artificial. Revisa la configuració de la teva API_KEY.");
      }
    }
  });

  function appendMessage(sender, text) {
    const id = 'msg-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.style.marginBottom = '15px';
    msgDiv.style.padding = '12px 16px';
    msgDiv.style.borderRadius = '12px';
    msgDiv.style.maxWidth = '80%';
    
    if (sender === 'user') {
      msgDiv.style.backgroundColor = 'var(--upc-blue)';
      msgDiv.style.color = 'white';
      msgDiv.style.marginLeft = 'auto';
    } else {
      msgDiv.style.backgroundColor = 'var(--border-color)';
      msgDiv.style.color = 'var(--text-main)';
      msgDiv.style.marginRight = 'auto';
    }
    
    msgDiv.innerHTML = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
  }

  function updateMessage(id, newText) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = newText;
  }
});