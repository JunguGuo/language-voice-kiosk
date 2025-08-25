export const PREPARED_SCRIPT = `Hello from the Cleveland Public Library—where books, ideas,
and big imaginations come to play. I'm lending my voice today
to explore the world, one language at a time. Let's see where this takes me!`;

export const SCENARIO_GROUPS = [
  {
    title: "What do you want to try in Chinese?",
    items: [
      { key: "travel", label: "Everyday Travel Phrases" },
      { key: "order", label: "Order Chinese food like a pro" },
      { key: "poem", label: "Recite ancient Chinese Poems" },
      { key: "song", label: "Song Lyrics" },
      { key: "speech", label: "Famous speeches" },
      { key: "improv", label: "Let AI help improvise" },
    ],
  },
];

export function getScenarioText(key: string, langCode: string) {
  const langGroup =
    LANGUAGE_GROUPS.find((g) => g.code === langCode) ?? LANGUAGE_GROUPS[0];
  const txt = langGroup.items.find((g) => g.key === key) ?? langGroup.items[0];

  return { en: txt.en, content: txt.content };
}

export const LANGUAGE_GROUPS = [
  {
    code: "zh",
    name: "Chinese (Mandarin)",
    title: "What do you want to try in Chinese?",
    items: [
      {
        key: "travel",
        label: "Everyday Travel Phrases",
        en: "Hello! Could you tell me where the nearest subway station is? I’d like to buy two tickets to the city center. By the way, what time does the last train leave tonight?",
        content:
          "你好！请问最近的地铁站在哪里？我想买两张去市中心的车票。顺便问一下，今晚末班车几点发车？",
      },
      {
        key: "order",
        label: "Order Chinese food like a pro",
        en: "Good evening, I’d like to order takeout. One Kung Pao Chicken, mildly spicy, and one Hot and Sour Soup. For the main dish, Egg Fried Rice. Please, no cilantro in any of the dishes.",
        content:
          "晚上好，我想点外卖。一份宫保鸡丁，微辣；再来一份酸辣汤。主食要蛋炒饭。请注意，所有菜里都不要放香菜。",
      },
      {
        key: "poem",
        label: "Recite ancient Chinese Poems",
        en: "Before my bed, the bright moonlight. I wonder if it’s frost upon the ground. I lift my head and gaze at the bright moon. I lower my head, thinking of my hometown.",
        content: "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
      },
      {
        key: "twister",
        label: "Chinese Tongue Twister",
        en: "Four is four, ten is ten. Fourteen is fourteen, forty is forty. Don’t mix up fourteen with forty, or four with ten.",
        content:
          "四是四，十是十，十四是十四，四十是四十。别把十四说成四十，也别把四说成十。",
      },
      {
        key: "idiom",
        label: "Classical Idiom Story",
        en: "Once upon a time, a farmer pulled on his seedlings every day, hoping they would grow faster. But instead, they withered and died.",
        content:
          "从前有个农夫，他天天把秧苗往上拔，希望它们长得快些。结果秧苗全都枯死了。",
      },
      {
        key: "improv",
        label: "Let AI help improvise",
        en: "Hey! Long time no see. Life has been busy, but tonight the stars are bright, and I feel like sharing a story with you. So, how have you been?",
        content:
          "嗨！好久不见。生活挺忙的，不过今晚星星很亮，我突然想和你聊聊故事。你最近过得怎么样？",
      },
    ],
  },
  {
    code: "ja",
    name: "Japanese",
    title: "What do you want to try in Japanese?",
    items: [
      {
        key: "anime",
        label: "Japanese Anime Monologue",
        en: "I will never give up! Even if I fall a hundred times, I will rise a hundred and one times. As long as my friends are with me, there is nothing I cannot face.",
        content:
          "俺は絶対に諦めない！たとえ百回倒れても、百一回立ち上がる。仲間がいる限り、俺に立ち向かえないものはない！",
      },
      {
        key: "order",
        label: "Order Japanese food like a pro",
        en: "Excuse me, I’d like one bowl of miso ramen with extra noodles, a plate of gyoza, and two cups of hot green tea. Also, could you bring the bill together at the end?",
        content:
          "すみません、味噌ラーメン一つ、替え玉でお願いします。餃子を一皿と、熱いお茶を二杯ください。お会計は最後にまとめてお願いします。",
      },
      {
        key: "haiku",
        label: "Recite Japanese Haiku",
        en: "An old pond. A frog jumps in. The sound of water spreads through the quiet evening air.",
        content: "古池や　蛙飛び込む　水の音。静かな夕暮れに、水音が広がる。",
      },
      {
        key: "twister",
        label: "Japanese Tongue Twisters",
        en: "Raw wheat, raw rice, raw egg. Try saying it three times quickly without making a mistake!",
        content: "生麦、生米、生卵。早口で三回続けて言ってみてください！",
      },
      {
        key: "samurai",
        label: "Samurai Drama Lines",
        en: "I am a warrior of honor. I do not fear death, for my blade speaks for justice. Tell me your name, so we may face each other with dignity.",
        content:
          "拙者は武士。死を恐れず、我が刀は正義を語る。名を名乗れ、互いに誇りを持って刃を交えよう！",
      },
      {
        key: "keigo",
        label: "Polite Customer Service Phrases",
        en: "Thank you very much for waiting. Would you like me to wrap this as a gift, or will you be using it right away?",
        content:
          "大変お待たせいたしました。こちらはご進物用にお包みいたしますか、それともすぐにご利用なさいますか？",
      },
    ],
  },
  {
    code: "de",
    name: "German",
    title: "What do you want to try in German?",
    items: [
      {
        key: "announce",
        label: "Train Station Announcement",
        en: "Attention please: The regional train to the city center departs from platform four in five minutes. Due to maintenance, there may be a short delay. Thank you for your understanding.",
        content:
          "Achtung bitte: Der Regionalzug in Richtung Stadtzentrum fährt in fünf Minuten von Gleis vier ab. Aufgrund von Wartungsarbeiten kann es zu einer kurzen Verzögerung kommen. Vielen Dank für Ihr Verständnis.",
      },
      {
        key: "order",
        label: "Order at a Café",
        en: "Hello, I’d like a cappuccino and two buttered rolls, please. Could I also have a slice of cheesecake to go? I’ll pay together at the end.",
        content:
          "Hallo, ich hätte gern einen Cappuccino und zwei Butterbrötchen, bitte. Könnte ich außerdem ein Stück Käsekuchen zum Mitnehmen bekommen? Ich zahle am Ende zusammen.",
      },
      {
        key: "twister",
        label: "German Tongue Twister",
        en: "Fisher’s Fritz fishes fresh fish; fresh fish Fisher’s Fritz fishes. Try it three times fast without tripping over your words!",
        content:
          "Fischers Fritze fischt frische Fische; frische Fische fischt Fischers Fritze. Versuch es dreimal schnell, ohne dich zu verhaspeln!",
      },
      {
        key: "proverb",
        label: "Proverbs",
        en: "Practice makes perfect. Every beginning is hard. Many roads lead to Rome. Let’s take it step by step and keep going.",
        content:
          "Übung macht den Meister. Aller Anfang ist schwer. Viele Wege führen nach Rom. Gehen wir Schritt für Schritt und machen weiter.",
      },
      {
        key: "formal",
        label: "Polite Customer Service",
        en: "Thank you for waiting. Would you prefer a printed receipt or a digital one? If you have any questions, I’ll be happy to help.",
        content:
          "Vielen Dank für Ihre Geduld. Möchten Sie einen gedruckten Beleg oder einen digitalen? Wenn Sie Fragen haben, helfe ich Ihnen gern weiter.",
      },
      {
        key: "fairytale",
        label: "Fairy-Tale Style",
        en: "Once upon a time, a small village slept under silver stars. A curious child followed a lantern’s glow and found a path that led straight into wonder.",
        content:
          "Es war einmal ein kleines Dorf, das unter silbernen Sternen schlief. Ein neugieriges Kind folgte dem Schein einer Laterne und fand einen Weg, der direkt ins Wunder führte.",
      },
    ],
  },
  {
    code: "es",
    name: "Spanish",
    title: "What do you want to try in Spanish?",
    items: [
      {
        key: "telenovela",
        label: "Telenovela Monologue",
        en: "I never imagined the truth would arrive tonight. If I open this letter, everything will change. But I’m ready—because my heart has already decided.",
        content:
          "Nunca imaginé que la verdad llegaría esta noche. Si abro esta carta, todo cambiará. Pero estoy listo, porque mi corazón ya decidió.",
      },
      {
        key: "order",
        label: "Order Tapas Like a Local",
        en: "Hi there! I’d like a portion of tortilla, patatas bravas, and grilled squid. Two sparkling waters, please. We’ll settle the bill together at the end.",
        content:
          "¡Hola! Quisiera una ración de tortilla, patatas bravas y calamares a la plancha. Dos aguas con gas, por favor. Pagamos todo junto al final.",
      },
      {
        key: "travel",
        label: "Metro Directions",
        en: "Excuse me, where is the nearest metro entrance? I need two tickets to the center. Do you know what time the last train leaves tonight?",
        content:
          "Perdón, ¿dónde está la entrada del metro más cercana? Necesito dos billetes al centro. ¿Sabe a qué hora sale el último tren esta noche?",
      },
      {
        key: "twister",
        label: "Spanish Tongue Twister",
        en: "Three sad tigers ate wheat in a wheat field. Say it three times in a row without making a mistake!",
        content:
          "Tres tristes tigres tragaban trigo en un trigal. ¡Dilo tres veces seguidas sin equivocarte!",
      },
      {
        key: "football",
        label: "Soccer Commentary",
        en: "He dribbles past one, past two—he shoots from outside the box… goal! The stadium explodes, and the dream is alive tonight.",
        content:
          "Regatea a uno, a dos… dispara desde fuera del área… ¡gol! El estadio estalla y el sueño sigue vivo esta noche.",
      },
      {
        key: "proverb",
        label: "Popular Sayings",
        en: "To the wise, few words are enough. Every cloud has a silver lining. Little by little, one goes far—let’s keep moving.",
        content:
          "A buen entendedor, pocas palabras. No hay mal que por bien no venga. Poco a poco se llega lejos; sigamos adelante.",
      },
    ],
  },
  {
    code: "fr",
    name: "French",
    title: "What do you want to try in French?",
    items: [
      {
        key: "cafe",
        label: "Order at a Café",
        en: "Hello, I’d like a café crème and two croissants, please. Could you bring a glass of water as well? We’ll pay together at the end.",
        content:
          "Bonjour, je voudrais un café crème et deux croissants, s’il vous plaît. Pourriez-vous apporter aussi un verre d’eau ? Nous paierons ensemble à la fin.",
      },
      {
        key: "metro",
        label: "Ask for Directions",
        en: "Excuse me, how do I get to the city center by metro? I need two tickets, and I’d like to know when the last train leaves tonight.",
        content:
          "Excusez-moi, comment aller au centre-ville en métro ? Il me faut deux billets, et j’aimerais savoir à quelle heure part le dernier train ce soir.",
      },
      {
        key: "twister",
        label: "French Tongue Twister",
        en: "The archduchess’s socks are they dry or extra dry? Try saying it quickly three times without getting tangled!",
        content:
          "Les chaussettes de l’archiduchesse sont-elles sèches ou archi-sèches ? Dites-le vite trois fois sans vous emmêler !",
      },
      {
        key: "poetic",
        label: "Poetic Lines",
        en: "Under the streetlights, the rain paints the night with silver. If you listen closely, the city whispers, and the heart answers softly.",
        content:
          "Sous les réverbères, la pluie peint la nuit d’argent. Si l’on écoute bien, la ville murmure, et le cœur répond tout doucement.",
      },
      {
        key: "polite",
        label: "Polite Service Phrases",
        en: "Thank you for waiting. Would you like a detailed receipt or a simple one? If you need anything else, I remain at your disposal.",
        content:
          "Merci de votre patience. Souhaitez-vous un reçu détaillé ou simple ? Si vous avez besoin de quoi que ce soit, je reste à votre disposition.",
      },
      {
        key: "market",
        label: "At the Market",
        en: "Good morning! I’d like a piece of Comté and some fresh fruit. Which pears are the sweetest today? I’ll take half a kilo, please.",
        content:
          "Bonjour ! Je voudrais un morceau de Comté et quelques fruits frais. Quelles poires sont les plus sucrées aujourd’hui ? J’en prends un demi-kilo, s’il vous plaît.",
      },
    ],
  },
  {
    code: "ar",
    name: "Arabic",
    title: "What do you want to try in Arabic?",
    items: [
      {
        key: "travel",
        label: "Travel Phrases",
        en: "Please, where is the nearest metro station? I want two tickets to the city center. What time does the last train leave tonight?",
        content:
          "من فضلك، أين أقرب محطة مترو؟ أريد تذكرتين إلى مركز المدينة. متى يغادر آخر قطار الليلة؟",
      },
      {
        key: "souk",
        label: "At the Souk",
        en: "Peace be upon you. This fabric is beautiful—do you have it in blue? If I take two meters, can you give me a better price?",
        content:
          "السلام عليكم. هذا القماش جميل، هل لديكم اللون الأزرق؟ إذا أخذت مترين، هل يمكن أن تعطيني سعراً أفضل؟",
      },
      {
        key: "proverb",
        label: "Proverbs",
        en: "Patience is the key to relief. Whoever strives, succeeds. One hand does not clap—so let’s work together.",
        content:
          "الصبر مفتاح الفرج. ومن جدَّ وجد. يدٌ واحدة لا تُصفِّق، فلنعمل معاً.",
      },
      {
        key: "twister",
        label: "Arabic Tongue Twister",
        en: "Sharif’s scarf dried on the line in the sun. Try to say it quickly three times without stumbling!",
        content:
          "شرشف شريف نشف على الحبل في الشمس. جرّب أن تقولها بسرعة ثلاث مرات من غير ما تتلعثم!",
      },
      {
        key: "formal_news",
        label: "Newscaster Style",
        en: "Good evening. We now present the main headlines. After the break, we bring you a detailed report and voices from the scene.",
        content:
          "مساء الخير. نقدم لكم الآن أبرز العناوين. وبعد الفاصل، نوافيكم بتقرير مفصل وأصوات من موقع الحدث.",
      },
      {
        key: "service",
        label: "Polite Service Phrases",
        en: "We apologize for the wait. Would you like a printed receipt or an electronic one? If you need any help, I am at your service.",
        content:
          "نعتذر عن الانتظار. هل تفضل إيصالاً مطبوعاً أم إلكترونياً؟ إذا احتجت إلى أي مساعدة، فأنا في خدمتك.",
      },
    ],
  },
  {
    code: "ru",
    name: "Russian",
    title: "What do you want to try in Russian?",
    items: [
      {
        key: "travel",
        label: "Metro Questions",
        en: "Excuse me, where is the nearest metro station? I need two tickets to the center. What time does the last train leave tonight?",
        content:
          "Извините, где находится ближайшая станция метро? Мне нужны два билета до центра. Во сколько уходит последний поезд сегодня вечером?",
      },
      {
        key: "order",
        label: "Order at a Cafe",
        en: "Hello, I’d like borscht, dumplings, and black tea with lemon, please. Could you bring the bill together at the end?",
        content:
          "Здравствуйте, пожалуйста, борщ, пельмени и чёрный чай с лимоном. Счёт можно принести в конце, вместе?",
      },
      {
        key: "toast",
        label: "Dinner Toast",
        en: "Dear friends, let’s raise our glasses. For health, for luck, and for the road ahead—may every step bring us closer to each other.",
        content:
          "Дорогие друзья, поднимем бокалы. За здоровье, за удачу и за путь вперёд — пусть каждый шаг приближает нас друг к другу.",
      },
      {
        key: "twister",
        label: "Russian Tongue Twister",
        en: "Sasha walked along the highway and sucked on a dry pastry. Try saying it quickly three times without mixing up the sounds!",
        content:
          "Шла Саша по шоссе и сосала сушку. Попробуйте быстро сказать три раза, не запутавшись в звуках!",
      },
      {
        key: "proverb",
        label: "Proverbs",
        en: "Without effort, you can’t pull even a fish out of the pond. Patience and work will grind down anything. Let’s keep at it and move forward.",
        content:
          "Без труда не вытащишь и рыбку из пруда. Терпение и труд всё перетрут. Давайте не бросать и двигаться вперёд.",
      },
      {
        key: "service",
        label: "Polite Service Phrases",
        en: "Thank you for waiting. Would you like a receipt by email or on paper? If you need anything else, I’ll be happy to help.",
        content:
          "Спасибо за ожидание. Хотите получить чек на почту или на бумаге? Если нужно ещё что-нибудь, с радостью помогу.",
      },
    ],
  },
  {
    code: "ko",
    name: "Korean",
    title: "What do you want to try in Korean?",
    items: [
      {
        key: "kdrama",
        label: "K-Drama Moment",
        en: "I won’t give up. Even if the world turns its back on me, I’ll take one more step. Because today, I finally chose myself.",
        content:
          "나는 포기하지 않아. 세상이 등을 돌려도 한 걸음 더 나아갈 거야. 오늘, 마침내 나 자신을 선택했으니까.",
      },
      {
        key: "order",
        label: "Order at a Café",
        en: "Hello! One iced Americano and one hot latte, please. Could you also add a slice of cheesecake? We’ll pay together at the end.",
        content:
          "안녕하세요! 아이스 아메리카노 한 잔이랑, 라떼 뜨거운 거 한 잔 주세요. 치즈케이크 한 조각도 추가해 주세요. 계산은 마지막에 같이 할게요.",
      },
      {
        key: "travel",
        label: "Subway Directions",
        en: "Excuse me, where is the nearest subway station? I need two tickets to the city center. What time does the last train leave tonight?",
        content:
          "실례합니다, 가장 가까운 지하철역이 어디예요? 시내까지 가는 표 두 장이 필요해요. 오늘 밤 막차는 몇 시에 출발하나요?",
      },
      {
        key: "twister",
        label: "Korean Tongue Twister",
        en: "The soy sauce factory manager is Manager Kang, and the soybean paste factory manager is Manager Jang. Try saying it three times fast without stumbling!",
        content:
          "간장공장 공장장은 강 공장장이고, 된장공장 공장장은 장 공장장이다. 빠르게 세 번 이어서 말해 보세요!",
      },
      {
        key: "honorific",
        label: "Polite Service Phrases",
        en: "Thank you for waiting. Would you like this wrapped as a gift, or will you use it right away? If you need help, please let me know.",
        content:
          "기다려 주셔서 감사합니다. 선물용으로 포장해 드릴까요, 바로 사용하실 건가요? 도움이 필요하시면 말씀해 주세요.",
      },
      {
        key: "casual",
        label: "Casual Chat",
        en: "Hey, long time no see! Things have been busy, but I’m doing okay. How have you been these days? Shall we grab coffee this weekend?",
        content:
          "야, 오랜만이야! 요즘 좀 바빴는데 잘 지냈어. 너는 요즘 어때? 이번 주말에 커피 한 잔 할래?",
      },
    ],
  },
  {
    code: "it",
    name: "Italian",
    title: "What do you want to try in Italian?",
    items: [
      {
        key: "drama",
        label: "Dramatic Monologue",
        en: "I followed the music through the streets, and suddenly the city opened like a stage. If I dare tonight, perhaps the curtain will rise for me.",
        content:
          "Ho seguito la musica per le strade e all’improvviso la città si è aperta come un palco. Se avrò il coraggio stanotte, forse il sipario si alzerà per me.",
      },
      {
        key: "order",
        label: "Order at the Bar",
        en: "Hello! I’d like a short espresso and a warm cornetto, please. Could you bring a glass of water too? I’ll pay together at the end.",
        content:
          "Ciao! Vorrei un espresso ristretto e un cornetto caldo, per favore. Potrebbe portare anche un bicchiere d’acqua? Pago tutto insieme alla fine.",
      },
      {
        key: "travel",
        label: "Metro Directions",
        en: "Excuse me, where is the nearest metro station? I’d like two tickets to the center. Do you know what time the last train leaves tonight?",
        content:
          "Mi scusi, dov’è la stazione della metropolitana più vicina? Vorrei due biglietti per il centro. Sa a che ora parte l’ultimo treno questa sera?",
      },
      {
        key: "twister",
        label: "Italian Tongue Twister",
        en: "Thirty-three people from Trento entered Trento, all thirty-three trotting. Try to say it three times in a row without tripping!",
        content:
          "Trentatré trentini entrarono a Trento, tutti e trentatré trotterellando. Provalo tre volte di seguito senza inciampare!",
      },
      {
        key: "proverb",
        label: "Proverbs",
        en: "Slowly, slowly one goes far. Who goes slowly goes safely and far. Let’s breathe, take our time, and keep moving.",
        content:
          "Piano piano si va lontano. Chi va piano va sano e va lontano. Respiriamo, prendiamoci il tempo e andiamo avanti.",
      },
      {
        key: "service",
        label: "Polite Service Phrases",
        en: "Thank you for waiting. Would you like this wrapped as a gift or will you use it right away? If you need anything else, I’m here.",
        content:
          "Grazie per l’attesa. Preferisce che lo confezioniamo come regalo o lo usa subito? Se serve altro, sono qui.",
      },
    ],
  },
];
