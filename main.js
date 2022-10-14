const url = "https://www.abibliadigital.com.br/api/verses/nvi/sl/";
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

let verseNum = 1;

//Funcion generete verse
function generate_verse() {
    // axios.get(url)
    noVerses.style.display ="none";

    fetch(`${url}${verseNum}`)
    .then(response=> response.json())
    .then(data =>{
        console.log(JSON.stringify(data.verses[1].text));
        let html = " ";
        if(data){
            html+= `
                <li data-id="${data.chapter.number}" class="verse verse1">
                    <span class="titleParagraph"> ${data.book.name} ${data.chapter.number}:${data.verses[1].number} </span>
                    <p class="verseParagraph">
                        ${data.verses[1].text}
                    </p>
                </li>
            `
        }
        noVerses.style.display = 'none';
        cards.innerHTML += html;
    })
    .catch(error=> console.log(error))

    if(verseNum<38){
        verseNum += 1;
    } else{
        verseNum = 1;
    }
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
    verseNum = 1;

}


// close function

function closeM(){
    popUp.style.display = "none";
}

// get verse of verseslist
function getVerse(e){
    e.preventDefault();
     
     const item = e.target;
     console.log(item.dataset.id);

     fetch(`${url}${item.dataset.id}`)
    .then(response=> response.json())
    .then(data =>{
        console.log(JSON.stringify(data.verses[1].text));
        let html = " ";
        if(data){
            html += `
                    <P class="left--verse">
                    ${data.verses[1].text}
                    </P>
                    <span class="left--bookVerse">${data.book.name} ${data.chapter.number}:${data.verses[1].number}</span>
            `;
        }
        modalText.innerHTML = html;
        popUp.style.display = "flex";
    })
    .catch(error=> console.log(error))
     


}



