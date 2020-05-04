export class CarouselCharacters{
    urlBase
    charactersDomArea
    otherInformation
    widthScreen
    charactersCars = []
    center = 50
    leftCards = 10
    cardsInScreen = 0
    allCharacters = []
    allDeaths
    timer
    searchBar
    optionsDomArea
    constructor(urlBase, domArea, domOtherInformation,optionsDomArea,searchBar){
        this.urlBase = urlBase
        this.charactersDomArea = domArea
        this.widthScreen = this.charactersDomArea.parentNode.offsetWidth
        this.otherInformation = domOtherInformation
        this.optionsDomArea = optionsDomArea
        this.searchBar = searchBar
        this.showCharacterHome()
    }

    async getCharacters(limit=18, offset=0, category='Breaking Bad'){
        const res = await fetch(`${this.urlBase}characters?limit=${limit}&offset=${offset}`)
        const data = await res.json()
        const characters = data.filter(character => character.category.includes(`${category}`))
        return characters
    }

    async getRandomQuote(characterName){
        const res = await fetch(`${this.urlBase}quote/random?author=${characterName}`)
        const data = await res.json()
        const quote = typeof data[0] == 'undefined'? '' : data[0].quote
        return `${quote.replace('B****','Bitch').replace('b****','bitch')}`
    }

    async showCharacterHome(){
        const homeRight = document.querySelector('.background .right')
        const res = await fetch(`${this.urlBase}characters/${Math.round(Math.random()) + 1}`)
        const character = await res.json();

        const characterCard = document.createElement('div')
        characterCard.setAttribute('class','character-card home')
        characterCard.innerHTML = `
                        <div class="card-header">
                            <img src="${character[0].img}" alt="${character[0].name}" class="character-photo">
                        </div>
                        <div class="card-body">
                            <h3 class="character-nickname">${character[0].nickname}</h3>
                            <h4 class="character-quote">${await this.getRandomQuote(character[0].name)}</h4>
                        </div>`
        homeRight.appendChild(characterCard)
    }

    async addInitialsCharacters(){
        const characters = await this.getCharacters()
        let charactersInOrden = new Array(characters.length)

        for(let i=0; i<characters.length; i++){
            const id = characters[i].char_id
            switch(id){
                case 1:
                    charactersInOrden[6] = characters[i]
                    break
                case 2:
                    charactersInOrden[5] = characters[i]
                    break
                case 8:
                    charactersInOrden[4] = characters[i]
                    break
                case 3:
                    charactersInOrden[3] = characters[i]
                    break
                case 4:
                    charactersInOrden[2] = characters[i]
                    break
                case 5:
                    charactersInOrden[1] = characters[i]
                    break
                case 6:
                    charactersInOrden[0] = characters[i]
                    break
                case 11:
                    charactersInOrden[7] = characters[i]
                    break
                case 12:
                    charactersInOrden[8] = characters[i]
                    break
                case 7:
                    charactersInOrden[9] = characters[i]
                    break
                case 10:
                    charactersInOrden[10] = characters[i]
                    break
                case 9:
                    charactersInOrden[11] = characters[i]
                    break
                case 13:
                    charactersInOrden[12] = characters[i]
                    break
                default:
                    charactersInOrden[i] = characters[i]
                    break
            }
        }

        this.allCharacters = this.allCharacters.concat(charactersInOrden)
        this.cardsInScreen = await this.renderCharacters(charactersInOrden)
        this.showCardCharacter(this.charactersDomArea.querySelector('#characterCard6'))

    }

    async renderCharacters(newCharacters, zIndex = 0){
        let characters = []
        for(let i=0; i<newCharacters.length;i++){
            const character = newCharacters[i]
            const nameCamelcase = `${(character.name).replace(/\s|\W/g,'')}`
            const characterDomReference = this.charactersDomArea.querySelector(`.${nameCamelcase}`)
            if(!characterDomReference){
                characters.push(character)
            }
        }
        let z_index = zIndex
        let lastIdCard = this.charactersCars.length
        let cardsInScreen = 0
        for(let i=0; i<characters.length;i++){
            
            this.leftCards += 5
            const characterCard = document.createElement('div')
            const classes = `character-card ${this.leftCards==50? 'center': ''}`

            const character = characters[i]
            characterCard.setAttribute('class',`${classes.trim()}`)
            characterCard.setAttribute('id',`characterCard${lastIdCard + i}`)

            characterCard.style.left = `calc(${this.leftCards}% - 5em)`
            const quote = await this.getRandomQuote(character.name)

            const nameCamelcase = `${(character.name).replace(/\s|\W/g,'')}`

            let occupations = ''
            for(let i=0; i< character.occupation.length;i++){
                occupations = `${occupations}
                        <li class="occupation">${character.occupation[i]}.</li>
                        `
            }
            let appearances = ''
            for(let i=0; i < character.appearance.length ;i++){
                appearances = `${appearances}
                        <li class="appearance">${character.appearance[i]}</li>
                        `
            }
            let colorStatus = ''
            switch(character.status){
                case 'Alive':
                    colorStatus = 'green'
                    break
                case 'Deceased':
                    colorStatus = 'red'
                    break
                case 'Presumed dead':
                    colorStatus = 'red'
                    break
                case '?':
                    colorStatus = 'blue'
                    break
            }

            characterCard.innerHTML = ` 
                <div class="card-header">
                    <img src="${character.img}" width="100px" height="100px" alt="${character.name}" class="character-photo" loading="lazy">
                    <div class="character-status" style="background-color: ${colorStatus};">
                        <h5 class="status">${character.status}</h5>
                    </div>
                </div>
                <div class="card-body">
                    <h4 class="character-name"><span class="label">name:</span> ${character.name}</h4>
                    <h4 class="character-nickname"><span class="label">nickname:</span> ${character.nickname}</h4>
                    <h4 class="character-birthday"><span class="label">birthday:</span> ${character.birthday}</h4>
                    <h4 class="character-quote ${nameCamelcase}">${quote}</h4>

                    <div class="character-occupations">
                        <h4 class="label">occupations:</h4>
                        <ul class="occupations">
                            ${occupations}
                        </ul>
                    </div>
                    
                    <div class="character-appearances">
                        <h4 class="label">appearances:</h4>
                        <ul class="appearances">
                            ${appearances}
                        </ul>
                    </div>
                    <div class="card-footer">
                        <h4 class="portrayed"><span class="label">portrayed by:</span> ${character.portrayed}</h4>
                    </div>
                </div>
                `

            this.charactersDomArea.appendChild(characterCard)

            z_index = this.setStylesCardsCharacter(i + lastIdCard, z_index)
            if(z_index > 0){
                cardsInScreen++
            }

            characterCard.addEventListener('click',e => {
                this.showCardCharacter(e.target.parentNode.parentNode)
            })
        }
        this.charactersCars = this.charactersDomArea.querySelectorAll('.character-card')
        return cardsInScreen
    }

    setStylesCardsCharacter(id, z_index, z_indexAux){
        const domCard = this.charactersDomArea.querySelector(`#characterCard${id}`)
        const left = parseInt(domCard.style.left.replace('calc(','').replace('% - 5em)',''))
        const positionCard = domCard.offsetLeft + domCard.offsetWidth
        const opacity = positionCard + this.charactersDomArea.offsetLeft < this.widthScreen && domCard.offsetLeft + this.charactersDomArea.offsetLeft > 0? '1': '0'
        let zIndex
        if(typeof z_indexAux != 'undefined' && z_indexAux){
            zIndex = Math.round(this.cardsInScreen / 2)
        }else{
            zIndex = left <= this.center? z_index + 1: z_index - 1
            zIndex = opacity == '1'? zIndex : 0
        }
        
        domCard.style.zIndex = `${zIndex}`;
        domCard.style.opacity = opacity
        return zIndex
    }

    showCardCharacter(newCardCenter){
        const left = parseInt(newCardCenter.style.left.replace('calc(','').replace('% - 5em)',''))
        if(left == this.center) return

        if((this.leftCards - this.center == 5 || left == this.leftCards) && this.charactersCars.length < 56){
            this.addCharacters()
        }
        clearTimeout(this.timer)
        const nameCharacter = newCardCenter.querySelector('.character-quote').classList[1]
        const info = document.querySelector('.section-character-info .info')
        info.innerHTML = newCardCenter.innerHTML
        newCardCenter.parentNode.parentNode.className = `characters ${nameCharacter}`

        const oldCardCenter = this.charactersDomArea.querySelector('.character-card.center')
        oldCardCenter.classList.remove('center')
        this.otherInformation.innerHTML = ''
        newCardCenter.classList.add('center')
        const oldLeft = parseInt(this.charactersDomArea.style.left.replace('%',''))

        const newLeft = (this.center - left) + oldLeft
        
        this.charactersDomArea.style.left = `${newLeft}%`

        this.center = left

        let z_index = 0
        let z_indexAux = false
        for(let i=0; i<this.charactersCars.length;i++){
            z_indexAux = newCardCenter.id == this.charactersCars[i].id? true : false
            z_index = this.setStylesCardsCharacter(i, z_index, z_indexAux)
        }
        this.timer = setTimeout(()=> this.renderOtherInformation(), 300) 
    }

    async addCharacters(){
        const characters = await this.getCharacters(11, this.charactersCars.length)
        await this.renderCharacters(characters,Math.round(this.cardsInScreen / 2))
        this.allCharacters = this.allCharacters.concat(characters)
    }

    async searchCharacter(keyWords){
        if(keyWords.length < 3) return
        let character = this.allCharacters.filter(character => character.name.toLowerCase().includes(`${keyWords.toLowerCase()}`))
        if(typeof character[0] == 'undefined'){
            const res = await fetch(`${this.urlBase}characters?name=${keyWords}`)
            let data = await res.json()
            data = data.filter(character => character.category.includes('Breaking Bad'))

            if(data.length == 1){
                this.renderAndShowCardCharacter(data)
            }else{
                this.renderOptions(data)  
            }
        }else if(character.length==1){
            this.showOpctionCard(character[0])
        }else{
            this.renderOptions(character)
        }

    }

    renderOptions(options){
        this.optionsDomArea.innerHTML = ''

        for(let i=0; i<options.length;i++){
            let option = document.createElement('div')
            option.setAttribute('class','searchOption')
            option.setAttribute('id',`option${i}`)
            option.textContent = `${options[i].name}`
            this.optionsDomArea.appendChild(option)
            option.addEventListener('click',()=>{
                this.showOpctionCard(options[i])
            })
        }
    }

    async renderAndShowCardCharacter(character){
        await this.renderCharacters(character)
        this.allCharacters = this.allCharacters.concat(character)
        this.showCardCharacter(this.charactersCars[this.charactersCars.length - 1])
        this.formatSearch()
    }

    showOpctionCard(character){
        const nameCamelcase = `${(character.name).replace(/\s|\W/g,'')}`
        const characterDomReference = this.charactersDomArea.querySelector(`.${nameCamelcase}`)
        this.showCardCharacter(characterDomReference.parentNode.parentNode)
        this.formatSearch()
    }

    formatSearch(){
        this.searchBar.value = ''
        this.optionsDomArea.innerHTML = ''
    }

    moveCharacter(key){
        let direction
        if(key != 'ArrowRight' && key != 'ArrowLeft'){return}
        const center = parseInt(this.charactersDomArea.querySelector('.character-card.center').id.replace('characterCard',''))
        switch(key){
            case 'ArrowLeft':
                direction = center - 1
                break
            case 'ArrowRight':
                direction = center + 1
                break
        }
        if(direction < 0 || direction == this.charactersCars.length) return
        const characterCard = this.charactersDomArea.querySelector(`#characterCard${direction}`)
        this.showCardCharacter(characterCard)
    }

    async renderOtherInformation(){
        this.allDeaths = (typeof this.allDeaths == 'undefined')? await this.getAllDeaths(): this.allDeaths
        const characterId = parseInt(this.charactersDomArea.querySelector('.character-card.center').id.replace('characterCard',''))
        const character = this.allCharacters[characterId]
        const deathInformation = this.allDeaths.filter(death => death.death == character.name)
        const deathCount = await this.getDeathCount(character.name)

        if(typeof deathInformation[0] == 'undefined'){
            this.otherInformation.innerHTML = `
                <h4><span class="label">deaths for which he was responsible:</span> ${deathCount[0].deathCount}</h4>`
            return
        }
        const {cause, responsible, last_words, season,episode, number_of_deaths} = deathInformation[0]

        this.otherInformation.innerHTML = `
            <h4><span class="label">deaths for which he was responsible:</span> ${deathCount[0].deathCount}</h4>
            <h3 class="label" style="margin-top: 1em;">death information</h3>
            <h4><span class="label">cause:</span> ${cause}</h4>
            <h4><span class="label">responsible:</span> ${responsible}</h4>
            <h4><span class="label">last words:</span> ${last_words}</h4>
            <h4><span class="label">season:</span> ${season}</h4>
            <h4><span class="label">episode:</span> ${episode}</h4>
            <br>`
    }

    async getDeathCount(characterName){
        const res = await fetch(`${this.urlBase}death-count?name=${characterName}`)
        const data = await res.json()
        return data
    }

    async getAllDeaths(){
        const res = await fetch(`${this.urlBase}deaths`)
        const data = await res.json()
        return data
    }

}