let arr = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];
let activePlayer = 0, isPlaying = true;

let UIController = (() => {
    return {
        check : (id) => {
            if(isPlaying) {
                if(arr[id[0]][id[1]] !== 0) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        idgenerator : (i,j) => {
            let num = 3*i + j + 1;
            switch(num) {
                case 1 : {
                    return 'one';
                }
                case 2 : {
                    return 'two';
                }
                case 3 : {
                    return 'three';
                }
                case 4 : {
                    return 'four';
                }
                case 5 : {
                    return 'five';
                }
                case 6 : {
                    return 'six';
                }
                case 7 : {
                    return 'seven';
                }
                case 8 : {
                    return 'eight';
                }
                case 9 : {
                    return 'nine';
                }
            }
        },
        checkWin : (id) => {
            let flag = true;
            for(let i=0;i<3;i++) {
                if(arr[i][id[1]] !== 1 + activePlayer) {
                    flag = false;
                    break;
                }
            }
            if (flag === true) {
                for(let i=0;i<3;i++) {
                    document.querySelector('#' + UIController.idgenerator(i,id[1]) + ' img').src = (activePlayer + 1) + '.png';
                }
                return false;
            }
            flag = true;
            for(let i=0;i<3;i++) {
                if(arr[id[0]][i] !== 1 + activePlayer) {
                    flag = false;
                    break;
                }
            }
            if (flag === true) {
                for(let i=0;i<3;i++) {
                    document.querySelector('#' + UIController.idgenerator(id[0],i) + ' img').src = (activePlayer + 1) + '.png';
                }
                return false;
            }
            flag = true;
            let which = 0;
            if(id[0]===id[1]) {
                for(let i=0;i<3;i++) {
                    if(arr[i][i] !== 1 + activePlayer) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    which = 1;
                }
            } else if(id[0] + id[1] === 2) {
                for(let i=0;i<3;i++) {
                    if(arr[i][2-i] !== 1 + activePlayer) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    which = 2;
                }
            }
            if(flag === true && which === 1) {
                for(let i=0;i<3;i++) {
                    document.querySelector('#' + UIController.idgenerator(i,i) + ' img').src = (activePlayer + 1) + '.png';
                }
                return false;
            }
            if(flag === true && which === 2) {
                for(let i=0;i<3;i++) {
                    document.querySelector('#' + UIController.idgenerator(i,2-i) + ' img').src = (activePlayer + 1) + '.png';
                }
                return false;
            }
            return true;
        },
        change : (id) => {
            if(isPlaying) {
                arr[id[0]][id[1]] = activePlayer + 1;
                if(activePlayer === 0) {
                    document.getElementById(id[2]).insertAdjacentHTML('afterbegin','<img src="x.png">');
                } else {
                    document.getElementById(id[2]).insertAdjacentHTML('afterbegin','<img src="o.png">');
                }
                isPlaying = UIController.checkWin(id);
                if (isPlaying) {
                    activePlayer = 1 - activePlayer;
                    document.querySelector('.player').textContent = 'Player ' + (1 + activePlayer);  
                }
            }
        }
    }
})();

let Controller = ((UICtrl) => {
    document.addEventListener('click',(event) => {
        let id = event.target.id;
        if(id !== '') {
            let idarray = Controller.idconverter(id);
            let check = UICtrl.check(idarray);
            if(check) {
                UICtrl.change(idarray);
            }
        }
    })
    return {
        idconverter : (id) => {
            let idarray = [];
            switch(id) {
                case 'one' : {
                    idarray[0] = 0;
                    idarray[1] = 0;
                    idarray[2] = 'one';
                    break;
                }
                case 'two' : {
                    idarray[0] = 0;
                    idarray[1] = 1;
                    idarray[2] = 'two';
                    break;
                }
                case 'three' : {
                    idarray[0] = 0;
                    idarray[1] = 2;
                    idarray[2] = 'three';
                    break;
                }
                case 'four' : {
                    idarray[0] = 1;
                    idarray[1] = 0;
                    idarray[2] = 'four';
                    break;
                }
                case 'five' : {
                    idarray[0] = 1;
                    idarray[1] = 1;
                    idarray[2] = 'five';
                    break;
                }
                case 'six' : {
                    idarray[0] = 1;
                    idarray[1] = 2;
                    idarray[2] = 'six';
                    break;
                }
                case 'seven' : {
                    idarray[0] = 2;
                    idarray[1] = 0;
                    idarray[2] = 'seven';
                    break;
                }
                case 'eight' : {
                    idarray[0] = 2;
                    idarray[1] = 1;
                    idarray[2] = 'eight';
                    break;
                }
                case 'nine' : {
                    idarray[0] = 2;
                    idarray[1] = 2;
                    idarray[2] = 'nine';
                    break;
                }
            }
            return idarray;
        }
    }
})(UIController);