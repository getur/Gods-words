const url = "https://www.abibliadigital.com.br/api/verses/nvi/sl/";
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const versesList = document.getElementById('right--verses');
const cards = document.getElementById('card');
const noVerses = document.getElementById('noVerse');
const closeBtn = document.getElementById('close');
const popUp = document.getElementById('popup');




// events 
generateBtn.addEventListener('click', generate_verse);
clearBtn.addEventListener('click', clear_all);
closeBtn.addEventListener('click', close);
cards.addEventListener('click', getVerse);

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
            html += `
                <li id="${data.chapter.number}" class="verse verse1">
                    <span class="titleParagraph"> ${data.book.name} ${data.chapter.number}:${data.verses[1].number} </span>
                    <p class="verseParagraph">
                        ${data.verses[1].text}
                    </p>
                </li>
            `;
        }
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
}


// close function

function close(){
    popUp.style.display = "none";
}

// get verse of verseslist
function getVerse(e){
    e.preventDefault();

    // console.log(e.target);
    const verseCard1 = document.getElementById('1').classList.remove('.verse');
    const verseCard = document.getElementById('1').classList.add('.activeVerse');

    if(e.target.classList.contains('verse1')){
        let verseItem = e.target.parentElement.parentElement;
        // console.log(verseItem);
        // console.log(e.target);


        fetch(`https://www.abibliadigital.com.br/api/verses/nvi/sl/1`);
        then(response=> response.json())
        then(data=> {
            // console.log(data);
        });
    }

}



