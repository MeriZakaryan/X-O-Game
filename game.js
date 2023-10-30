function createBlocks(){
    let main = document.querySelector('main')
    for (let i = 0; i < 9; i++) {
        let div = document.createElement('div')
        main.appendChild(div)
        div.classList.add('div-shaping')
    }
}
createBlocks()

function mainProcess(){
    let divs = document.querySelectorAll('.div-shaping')
    let counter = 0
    for(let el of divs){
        el.addEventListener('click', function func(event){
            if(!el.hasChildNodes('p')){
                counter++
                counter % 2 ? el.innerHTML = `<p>X</p>` : el.innerHTML = `<p>O</p>`
            }
            event.target.textContent === 'O' ? event.target.style.color = 'rgb(9, 9, 116)' : event.target.style.color = 'black'
        
            setTimeout(() => logicCheck(), 0)
        })
    }
    
}
mainProcess()

let resDiv = document.querySelector('#game-result ')
let resDivText = document.querySelector('#game-result p')
let btn = document.querySelectorAll('#btn-bar button')
let okBtn = document.querySelector('#btn-1')

function logicCheck(){
    let divs = document.querySelectorAll('.div-shaping')
    let m = Math.sqrt(divs.length)
    divs = Array.from(divs)
    let existance = divs.every(elem => elem.textContent !== '')
    if(existance){
        resDiv.style.display = 'flex'
        resDivText.innerText = ('Neither of you won. Ha-ha-ha!!!')
        okBtn.style.display = 'flex'
        okBtn.addEventListener('click', () => window.location.reload())
    }else{
        let mainArr = [], res = []
        for(let i = 0; i < divs.length; i += m){
            let arr = divs.slice(i,i + m)
            mainArr.push(arr)
        }
        let diaganal1=[]
        let diaganal2=[]
        for(let i = 0, j = mainArr[0].length - 1; i < mainArr.length && j >= 0; i++, j--){
            diaganal1.push(mainArr[i][i])
            diaganal2.push(mainArr[i][j])
            let cols = []
            for(let k = 0; k < mainArr[0].length; k++){
                cols.push(mainArr[k][i])
            }
            res.push(cols);
        }
        res = res.concat(mainArr, [diaganal1], [diaganal2])
        resultOfGame(res)
    }
}   

function resultOfGame(arr){
    for(let el of arr){
        let checkerX = el.every(elem => elem.textContent === 'X')
        let checkerO = el.every(elem => elem.textContent === 'O')
        if(checkerX || checkerO){
            resDiv.style.display = 'flex'
            resDivText.innerText = `${el[0].innerText} won !!!`
            okBtn.style.display = 'flex'
            okBtn.addEventListener('click', function(){
                resDivText.innerText = 'Do you wanna play again??'
                for(let b of btn){
                    b.style.display = 'flex'
                    okBtn.style.display = 'none'
                    b.addEventListener('click', function(){
                        if(b.textContent === 'NO'){
                            resDiv.style.display = 'none'
                            let divs = document.querySelectorAll('.div-shaping')
                            for(let el of divs){
                                el.removeEventListener('click', func)
                            }
                        }else{
                            window.location.reload()
                        }
                    })
                } 
            })
        }
    }
}

