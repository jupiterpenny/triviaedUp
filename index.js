
var dataArr = [];
var p;
var Answer;
var Number;
var count = 0;
var missed = 0;
function getTrivia() {
    $.getJSON('data.json', function (data) {


        for (var key in data) {
            dataArr.push(data[key]);
        }

        p = Math.floor(Math.random() * dataArr[0].length);


        var Question = JSON.stringify(dataArr[0][p].Question);
        Number = dataArr[0][p].Number;
        var a = Question.replace(/[^A-Za-z0-9]/g, ' ');

        var one = JSON.stringify(dataArr[0][p].one);
        var b = one.replace(/[^A-Za-z0-9]/g, ' ');

        var two = JSON.stringify(dataArr[0][p].two);
        var c = two.replace(/[^A-Za-z0-9]/g, ' ');

        var three = JSON.stringify(dataArr[0][p].three);
        var d = three.replace(/[^A-Za-z0-9]/g, ' ');

        Answer = JSON.stringify(dataArr[0][p].Answer);
        var e = Answer.replace(/[^A-Za-z0-9]/g, ' ');


        document.getElementById('Questions').innerHTML = a + "?";
        document.getElementById('one').innerHTML = "1. " + b;
        document.getElementById('one').value = b;
        document.getElementById('two').innerHTML = "2. " + c;
        document.getElementById('two').value = c;
        document.getElementById('three').innerHTML = "3. " + d;
        document.getElementById('three').value = c;

        document.getElementById('Answer').innerHTML = "Answer: " + e;
        // document.getElementById('Questioned').innerHTML = a + "?";
    });

    // console.log(dataArr, 'dataArr');

}

function getSelectedValue(value){
    // var answered = document.getElementById('AnswersSelect').selectedIndex;
    var e = Answer.replace(/[^A-Za-z0-9]/g, ' ');
    if (value === Number){
        count = count +5;
        $('.card').toggleClass('flipped');
        document.getElementById("checked").innerHTML = "Great Job "+ count + " points!";

setTimeout(function() {
    $('.card').toggleClass('flipped');
            getTrivia();
        }, 2000);


    } else {
        missed ++;
        $('.card').toggleClass('flipped');
        document.getElementById("checked").innerHTML = "The answer was " + e + ".  Total missed: " + missed;

        setTimeout(function() {
            $('.card').toggleClass('flipped');
            getTrivia();
        }, 2000);

    }

    if (missed >= 3){
       gameover();
    }
}




function sendInfo() {
       
    var name = prompt("Please enter your name");

    if (name === null) {
        name = "guest";
    }

    var i = 100;
    var random = Math.floor(new Date().getTime() / 1000 + i);
    var k = 'Users/' + name;
    firebase.database().ref(k).set({
        name: name,
        count: count
    });
    i++;
    
    document.getElementById("sendScore").style.display="none";
}

function reload(){
    setTimeout(function(){
        location.reload();
    }, 2000);
}
var value;

$('#sendBut').on('touchstart click', function(){
    sendInfo();
});

$('#ghosted').on('touchstart click', function(){
    getSelectedValue();
});

$('#one').on('touchstart click', function(){
  checkOne();
});

$('#two').on('touchstart click', function(){
  checkTwo();
});

$('#three').on('touchstart click', function(){
 checkThree();
});


function checkOne(){
    value = 1;
    getSelectedValue(value);
}

function checkTwo(){
    value = 2;
    getSelectedValue(value);
}

function checkThree(){
    value = 3;
    getSelectedValue(value);
}



function gameover(){
    document.getElementById('card').style.display = 'none';
    document.getElementById('gameEnded').style.display = "block";
}
