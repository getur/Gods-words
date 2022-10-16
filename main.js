const url = "https://www.abibliadigital.com.br/api/verses/nvi/random";
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const versesList = document.querySelector('.right--verses');
const cards = document.getElementById('card');
const noVerses = document.getElementById('noVerse');
const closeBtn = document.getElementById('close');
const popUp = document.getElementById('popup');
const modalText = document.querySelector('.left--text');
const verse = document.querySelectorAll('.verse')



// events 
generateBtn.addEventListener('click', generate_verse);
clearBtn.addEventListener('click', clear_all);
closeBtn.addEventListener('click', closeM);
versesList.addEventListener('click', getVerse);

//Funcion generete verse
function generate_verse() {
    // axios.get(url)
    noVerses.style.display ="none";

    fetch(`${url}`, { 
        hearders: new Headers({
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNhdCBPY3QgMTUgMjAyMiAwMTowODo0OCBHTVQrMDAwMC5nZXR1cmV1c2ViaW9AZ21haWwuY29tIiwiaWF0IjoxNjY1Nzk2MTI4fQ.qLbeYiQeSn-bO0w1m5yBNa-aJELm7-nrw-N_5dmqk7U'
        })
    })
    .then(response=> response.json())
    .then(data =>{
        console.log(JSON.stringify(data.text));
        // verses.push(data);
        

        let html = " ";
        if(data){
            html+= `
                <li data-id="${data.chapter}" class="${data.book.abbrev.pt} ${data.number} verse verse1">
                    <span class="titleParagraph"> ${data.book.name} ${data.chapter}:${data.number} </span>
                    <p class="verseParagraph">
                        ${data.text}
                    </p>
                </li>
            `

        }
        noVerses.style.display = 'none';
        cards.innerHTML += html;
    })
    .catch(error=> console.log(error))

 }

//  clear all functions
function clear_all (){
    let html = `
        <div id="noVerse" class="conteiner__noVerse">
            <img class="noVerse" src="_assets/Bibliophile-bro 1.png" alt="no verse yet image">
            <div class="txt__noVerse">
                <h2 class="noVerse">No verses yet</h2>
                <span class="subtext noVerse"> Generate one clicking in generate verse button</span>
            </div>
        </div>
    `;
    cards.innerHTML = html;
    noVerses.style.display = "flex";
    closeM();
}


// close function
function closeM(){
    popUp.style.display = "none";
}

// get verse of verseslist
function getVerse(e){
    e.preventDefault();
     
     const item = e.target;

     let chap = item.dataset.id;
     let number = item.classList[1];
     let abb = item.classList[0];

     fetch(`https://www.abibliadigital.com.br/api/verses/nvi/${abb}/${chap}/${number}`, { 
        hearders: new Headers({
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNhdCBPY3QgMTUgMjAyMiAwMTowODo0OCBHTVQrMDAwMC5nZXR1cmV1c2ViaW9AZ21haWwuY29tIiwiaWF0IjoxNjY1Nzk2MTI4fQ.qLbeYiQeSn-bO0w1m5yBNa-aJELm7-nrw-N_5dmqk7U'
        })
    })
    .then(response=> response.json())
    .then(data =>{
        console.log(JSON.stringify(data.text));
        let html = " ";
        if(data){
            html += `
                    <P class="left--verse">
                    ${data.text}
                    </P>
                    <span class="left--bookVerse">${data.book.name} ${data.chapter}:${data.number}</span>
            `;
        }
        modalText.innerHTML = html;
        popUp.style.display = "flex";
    })
    .catch(error=> console.log(error))
     
}


//copy to cliboard




