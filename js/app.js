import {CarouselCharacters} from './carousel.js'
import {animate} from './furgoneta.js'

const urlBase = 'https://www.breakingbadapi.com/api/'
const charactersDomArea = document.querySelector('.allCharacters')
const otherInformation = document.querySelector('.characters .section-character-info .otherInformation')
const searchBar = document.querySelector('#searchBar')
const searchIcon = document.querySelector('#searchIcon')
const optionsDomArea = document.querySelector('.characters .search-options')

export let stateFocusSections = {
    focusCharacters: false,
    focusEpisodes: false
}

let focusCharacters = false

const carouselCharacters = new CarouselCharacters(urlBase, charactersDomArea, otherInformation, optionsDomArea, searchBar)

const myFullpage = new fullpage('#fullpage', {
    anchors: ['header', 'characters', 'episodes', 'credits'],
    keyboardScrolling: true,
    afterRender: function(){
        start()
        document.addEventListener('keydown', e =>{
            if(stateFocusSections.focusCharacters){
               carouselCharacters.moveCharacter(e.key)
            }
        })
        searchIcon.addEventListener('click',() => {carouselCharacters.searchCharacter(searchBar.value)})
        searchBar.addEventListener('keyup', e =>{
            if(e.key == 'Enter')
                carouselCharacters.searchCharacter(searchBar.value)
        })

        document.querySelector('.controlButtons .buttonLeft').addEventListener('click',()=> {carouselCharacters.moveCharacter('ArrowLeft')})
        document.querySelector('.controlButtons .buttonRight').addEventListener('click',()=> {carouselCharacters.moveCharacter('ArrowRight')})

        searchBar.addEventListener('focus', () =>{
            stateFocusSections.focusCharacters = false;
        })

        searchBar.addEventListener('focusout', () =>{
            stateFocusSections.focusCharacters = true;
        })
    },
    afterLoad: function(origin, destination, direction){
        var loadedSection = this;
        if(destination.anchor == 'header'){
            stateFocusSections.focusCharacters = false;
            stateFocusSections.focusEpisodes = false

        }
        else if(destination.anchor == 'characters'){
            stateFocusSections.focusCharacters = true;
            stateFocusSections.focusEpisodes = false
        }
        else if(destination.anchor == 'episodes'){
            stateFocusSections.focusCharacters = false;
            stateFocusSections.focusEpisodes = true
            animate()
        }
        
    },
    normalScrollElements: '.episodes-menu'
})

async function start(){
    await carouselCharacters.addInitialsCharacters()
    getAllEpisodes()
}

async function getAllEpisodes(){
    const episodeSection = document.querySelector('.episodes-section .episodes-menu')
    const res = await fetch(`${urlBase}episodes?series=Breaking Bad`)
    const episodes = await res.json()
    episodes.forEach(episode =>{
        const details = document.createElement('details')
        const summary = document.createElement('summary')
        if(episode.episode_id == 1){
            details.setAttribute('open','true')
        }
        summary.textContent = `${episode.season}.${episode.episode} - ${episode.title}`
        let characters = ''

        episode.characters.forEach(character =>{
            characters = `${characters} <li>${character}</li>`
        })

        const episodeInfo = `
                <div class="details-content">
                    <h4><span class="label">air date:</span> ${episode.air_date}</h4>
                    <h4 class="label">characters:</h4>
                    <ul class="characters-list">
                        ${characters}
                    </ul>
                </div>`

        details.innerHTML = episodeInfo
        details.appendChild(summary)
        episodeSection.appendChild(details)
        summary.addEventListener('click',(e)=>{
            if(typeof e.target.parentNode.attributes[0] != 'undefined'){
                e.target.parentNode.removeAttribute('open')
                e.preventDefault()
                return
            }
            episodeSection.scrollTop = e.target.parentNode.offsetTop - 5
            document.querySelectorAll('details').forEach(detail => detail.removeAttribute('open'))
        })
    })
}