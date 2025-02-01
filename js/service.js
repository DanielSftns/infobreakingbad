import episodes from "../data/episodes.js"
import characters from "../data/characters.js"
import quotesData from "../data/quotes.js"

export const getAllEpisodes = async () => {
  return episodes
}

export const getCharacters = async (limit=18, offset=0) => {
  return characters.slice(offset, offset + limit)
    .map(character => ({ ...character, img: `./img/${character.name}.webp` }))
}

export const getRandomQuote = async (characterName) => {
  const { quotes } = quotesData.find(quote => quote.character === characterName) || {}
  if (!quotes) return
  return quotes[Math.floor(Math.random() * quotes.length)]
}

export const getDeathCount = async (characterName) => {
  const { length } = characters.filter(character => character.dead?.responsible === characterName)
  return length
}

export const getDeath = async (characterName) => {
  return characters.find(character => character.name === characterName).dead
}

export const searchCharacters = async (query) => {
  return characters.filter(character => character.name.toLowerCase().includes(query.toLowerCase()))
}