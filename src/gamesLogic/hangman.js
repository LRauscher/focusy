import { updateHighScore, displayHighScore } from "../main.js";

export function hangmanGame(container, callback) {
  container.innerHTML = ''; // Clear container
  container.id = 'hangman-game';

  // Define the words for the game
  const words = [
    'elephant', 'mountain', 'river', 'desert', 'ocean', 'island', 'forest', 
    'jungle', 'savannah', 'prairie', 'volcano', 'earthquake', 'tornado', 
    'hurricane', 'avalanche', 'tsunami', 'continent', 'country', 'city', 
    'village', 'capital', 'democracy', 'republic', 'monarchy', 'dictatorship', 
    'election', 'government', 'president', 'prime', 'minister', 'senate', 
    'parliament', 'constitution', 'freedom', 'justice', 'equality', 'rights', 
    'law', 'court', 'judge', 'jury', 'trial', 'crime', 'punishment', 'prison', 
    'police', 'detective', 'evidence', 'clue', 'mystery', 'adventure', 
    'exploration', 'discovery', 'invention', 'innovation', 'technology', 
    'medicine', 'science', 'biology', 'chemistry', 'physics', 'astronomy', 
    'geology', 'meteorology', 'zoology', 'botany', 'ecology', 'genetics', 
    'evolution', 'species', 'habitat', 'ecosystem', 'biodiversity', 'conservation', 
    'climate', 'weather', 'seasons', 'winter', 'spring', 'summer', 'autumn', 
    'temperature', 'humidity', 'precipitation', 'drought', 'flood', 'wildfire', 
    'tsunami', 'earthquake', 'volcano', 'tornado', 'hurricane', 'rainbow', 
    'lightning', 'thunder', 'cloud', 'sun', 'moon', 'planet', 'star', 'galaxy', 
    'universe', 'comet', 'meteor', 'asteroid', 'blackhole', 'nebula', 
    'constellation', 'satellite', 'telescope', 'spaceship', 'astronaut', 
    'exploration', 'rocket', 'orbit', 'gravity', 'mass', 'energy', 'force', 
    'motion', 'acceleration', 'velocity', 'speed', 'distance', 'time', 'space', 
    'dimension', 'relativity', 'quantum', 'theory', 'particle', 'atom', 
    'molecule', 'element', 'compound', 'reaction', 'chemical', 'bond', 'enzyme', 
    'protein', 'cell', 'tissue', 'organ', 'system', 'organism', 'species', 
    'population', 'community', 'environment', 'conservation', 'sustainability', 
    'renewable', 'energy', 'solar', 'wind', 'hydro', 'geothermal', 'nuclear', 
    'fusion', 'fission', 'electric', 'vehicle', 'battery', 'charge', 'current', 
    'voltage', 'resistance', 'circuit', 'magnet', 'magnetic', 'field', 
    'electromagnet', 'induction', 'radiation', 'radioactivity', 'half-life', 
    'isotope', 'nucleus', 'proton', 'neutron', 'electron', 'quark', 'gluon', 
    'boson', 'photon', 'neutrino', 'wave', 'particle', 'duality', 'interference', 
    'diffraction', 'refraction', 'reflection', 'absorption', 'emission', 
    'spectrum', 'frequency', 'wavelength', 'amplitude', 'resonance', 'harmonics', 
    'sound', 'noise', 'vibration', 'pitch', 'tone', 'melody', 'rhythm', 
    'harmony', 'tempo', 'beat', 'genre', 'classical', 'jazz', 'blues', 
    'rock', 'pop', 'hiphop', 'country', 'folk', 'electronic', 'dance', 
    'orchestra', 'symphony', 'choir', 'band', 'concert', 'festival', 
    'performance', 'theater', 'drama', 'comedy', 'tragedy', 'musical', 
    'ballet', 'opera', 'actor', 'actress', 'director', 'producer', 'screenplay', 
    'script', 'scene', 'dialogue', 'character', 'plot', 'narrative', 
    'protagonist', 'antagonist', 'conflict', 'resolution', 'theme', 
    'motif', 'symbol', 'metaphor', 'simile', 'allegory', 'satire', 'parody', 
    'irony', 'foreshadowing', 'flashback', 'climax', 'denouement', 'epilogue', 
    'prologue', 'chapter', 'paragraph', 'sentence', 'word', 'letter', 'alphabet', 
    'vowel', 'consonant', 'grammar', 'syntax', 'punctuation', 'spelling', 
    'vocabulary', 'dictionary', 'thesaurus', 'encyclopedia', 'manuscript', 
    'novel', 'short', 'story', 'poem', 'sonnet', 'haiku', 'limerick', 
    'ode', 'elegy', 'epic', 'myth', 'legend', 'fable', 'fairy', 'tale', 
    'folklore', 'superstition', 'magic', 'wizard', 'witch', 'dragon', 
    'unicorn', 'phoenix', 'griffin', 'mermaid', 'centaur', 'minotaur', 
    'medusa', 'vampire', 'werewolf', 'zombie', 'ghost', 'spirit', 'demon', 
    'angel', 'god', 'goddess', 'mythology', 'pantheon', 'ritual', 'sacrifice', 
    'prayer', 'meditation', 'religion', 'philosophy', 'ethics', 'morality', 
    'virtue', 'vice', 'good', 'evil', 'justice', 'injustice', 'truth', 
    'lie', 'reality', 'illusion', 'existence', 'being', 'consciousness', 
    'mind', 'thought', 'emotion', 'feeling', 'sensation', 'perception', 
    'memory', 'imagination', 'dream', 'fantasy', 'creativity', 'art', 
    'painting', 'sculpture', 'architecture', 'literature', 'music', 
    'dance', 'theater', 'film', 'photography', 'cinematography', 
    'aesthetics', 'beauty', 'ugliness', 'harmony', 'balance', 'proportion', 
    'perspective', 'composition', 'contrast', 'color', 'tone', 'shade', 
    'light', 'shadow', 'texture', 'pattern', 'form', 'shape', 'line', 
    'curve', 'angle', 'dimension', 'space', 'volume', 'mass', 'density', 
    'gravity', 'inertia', 'momentum', 'force', 'energy', 'work', 'power', 
    'mechanics', 'dynamics', 'thermodynamics', 'fluid', 'pressure', 
    'temperature', 'heat', 'entropy', 'radiation', 'conduction', 
    'convection', 'insulation', 'reflection', 'refraction', 'diffraction', 
    'absorption', 'emission', 'spectrum', 'frequency', 'wavelength', 
    'amplitude', 'resonance', 'vibration', 'wave', 'particle', 'photon', 
    'electron', 'proton', 'neutron', 'atom', 'molecule', 'element', 
    'compound', 'mixture', 'solution', 'reaction', 'bond', 'covalent', 
    'ionic', 'metallic', 'hydrogen', 'oxygen', 'carbon', 'nitrogen', 
    'sulfur', 'phosphorus', 'chlorine', 'fluorine', 'helium', 'neon', 
    'argon', 'krypton', 'xenon', 'radon', 'lithium', 'sodium', 'potassium', 
    'calcium', 'magnesium', 'iron', 'copper', 'zinc', 'silver', 'gold', 
    'platinum', 'mercury', 'lead', 'tin', 'nickel', 'aluminum', 'silicon', 
    'carbon', 'diamond', 'graphite', 'quartz', 'mica', 'feldspar', 'clay', 
    'soil', 'sand', 'gravel', 'rock', 'stone', 'boulder', 'pebble', 
    'earthquake', 'volcano', 'tsunami', 'avalanche', 'landslide', 
    'flood', 'drought', 'wildfire', 'tornado', 'hurricane', 'storm', 
    'rain', 'snow', 'hail', 'sleet', 'ice', 'frost', 'dew', 'fog', 
    'mist', 'cloud', 'rainbow', 'lightning', 'thunder', 'storm', 
    'tornado', 'hurricane', 'cyclone', 'typhoon', 'monsoon', 
    'earthquake', 'volcano', 'tsunami', 'avalanche', 'landslide', 
    'flood', 'drought', 'wildfire', 'tornado', 'hurricane', 'storm', 
    'rain', 'snow', 'hail', 'sleet', 'ice', 'frost', 'dew', 'fog', 
    'mist', 'cloud', 'rainbow', 'lightning', 'thunder', 'storm', 
    'tornado', 'hurricane', 'cyclone', 'typhoon', 'monsoon', 
    'earthquake', 'volcano', 'tsunami', 'avalanche', 'landslide', 
    'flood', 'drought', 'wildfire', 'tornado', 'hurricane', 'storm', 
    'rain', 'snow', 'hail', 'sleet', 'ice', 'frost', 'dew', 'fog', 
    'mist', 'cloud', 'rainbow', 'lightning', 'thunder', 'storm', 
    'tornado', 'hurricane', 'cyclone', 'typhoon', 'monsoon'
  ];  
  const word = words[Math.floor(Math.random() * words.length)];

  // Initialize game state
  let guessedLetters = [];
  let remainingAttempts = 6;
  let score = 0;

  // Create elements for game display
  const attemptsDiv = document.createElement('div');
  const wordContainer = document.createElement('div');
  const messageDiv = document.createElement('div');
  const highScoreDiv = document.createElement('div');
  const input = document.createElement('input');

  // Function to render the game UI
  const renderGame = () => {
    attemptsDiv.innerText = `Attempts left: ${remainingAttempts}`;
    wordContainer.innerHTML = ''; // Clear previous word display

    // Display the word with guessed letters
    word.split('').forEach(letter => {
      const letterSpan = document.createElement('span');
      letterSpan.innerText = guessedLetters.includes(letter) ? letter : '_';
      wordContainer.appendChild(letterSpan);
    });

    // Display the high score
    highScoreDiv.innerText = `High Score: ${displayHighScore('Hangman')}`;

    // Clear input and focus it
    input.value = '';
    input.focus();
  };

  // Function to handle game outcome
  const handleGameOver = (won) => {
    messageDiv.innerText = won ? 'Congratulations, you win!' : `Game over! The word was: ${word}`;
    if (won) {
      score = remainingAttempts;
      updateHighScore('Hangman', score);
      highScoreDiv.innerText = `High Score: ${displayHighScore('Hangman')}`;
    }
    setTimeout(() => {
      callback(true);
    }, 2000);
  };

  // Set up input element
  input.maxLength = 1;
  input.addEventListener('input', () => {
    const letter = input.value.toLowerCase();
    if (!guessedLetters.includes(letter) && /^[a-z]$/.test(letter)) {
      guessedLetters.push(letter);
      if (!word.includes(letter)) {
        remainingAttempts--;
      }
      if (word.split('').every(letter => guessedLetters.includes(letter))) {
        handleGameOver(true);
      } else if (remainingAttempts <= 0) {
        handleGameOver(false);
      }
      renderGame();
    }
  });

  // Append elements to the container
  container.appendChild(attemptsDiv);
  container.appendChild(wordContainer);
  container.appendChild(input);
  container.appendChild(messageDiv);
  container.appendChild(highScoreDiv);

  // Initial render
  renderGame();
}