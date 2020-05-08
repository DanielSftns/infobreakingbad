self.addEventListener('message',e =>{
	let {leftCards, character, id} = e.data

    leftCards += 5

    const classes = `character-card ${leftCards==50? 'center': ''}`
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

    const characterCard = ` 
    <div class="${classes.trim()}" id="characterCard${id}" style="left: calc(${leftCards}% - 5em);">
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
            <h4 class="character-quote ${nameCamelcase}"></h4>

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
    </div>`

	self.postMessage({leftCards, characterCard})

})