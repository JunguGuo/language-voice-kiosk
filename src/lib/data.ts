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
    ]
  }
];

export function getScenarioText(key: string){
  switch(key){
    case "travel":
      return {
        en: "Hi! Where is the nearest subway station? I'd like to buy two tickets to the city center. Also, what time does the last train leave tonight?",
        zh: "你好！最近的地铁站在哪里？我想买两张去市中心的车票。还有，今晚末班车几点发车？"
      };
    case "order":
      return {
        en: "Hi there, I'd like to place a takeout order. One Kung Pao Chicken, mildly spicy, and one Hot and Sour Soup. For the main dish, Egg Fried Rice. No cilantro, please!",
        zh: "您好，我想点外卖。一份宫保鸡丁，微微辣；再来一份酸辣汤。主食要蛋炒饭。对了，不要香菜！"
      };
    case "poem":
      return {
        en: "Let me try reciting a classic: 'Quiet Night Thoughts' by Li Bai. I hope my tone captures the calm and homesickness in the poem.",
        zh: "让我试着背一首经典：《静夜思》——李白。希望我的语气能表达出诗中那份宁静与思乡。"
      };
    case "song":
      return {
        en: "Let's try a pop chorus line with solid rhythm and clarity. Keep it playful and bright.",
        zh: "来试一段流行歌曲的副歌，节奏感强一点，清晰又活泼。"
      };
    case "speech":
      return {
        en: "A short, powerful line from a famous speech—slow, clear, and confident, so every word lands with meaning.",
        zh: "选一段著名演讲中的有力句子——放慢、清晰、自信，让每个词都更有分量。"
      };
    default:
      return {
        en: "Give me a fun, improvised line that shows off pronunciation and pacing, like you're chatting with a friend.",
        zh: "来一段即兴台词，展示发音和节奏，就像和朋友聊天一样自然。"
      };
  }
}