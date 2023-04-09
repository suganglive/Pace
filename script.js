// function 이름 : getInfo
// function 설명 : 사용자가 입력한 거리와 기록을 출력합니다.
// function input : None
// function output : distance, time
function getInfo() {
    let distance = $('#distance').val();
    let time = $('#time').val();
    return { distance, time };
}

// function 이름 : getSeconds
// function 설명 : 사용자가 입력한 기록의 초를 계산합니다. 사용자는 hh:mm:ss의 형식을 따서 입력합니다. 예(01:30:23)
// function input : None
// function output : record time(only seconds)
function getSeconds() {
    let t = getInfo().time;
    if (t.length != 8) {
        alert("Please fill it out according to the format. \n ex) 03:16:54, 00:18:54")
        window.location.reload()
        return;
    } else if (t.substring(2, 3) != ":" || t.substring(5, 6) != ":") {
        alert("Please fill it out according to the format. \n ex) 03:16:54, 00:18:54")
        window.location.reload()
        return;
    }
    let hour = t.substring(0, 2);
    hour = hour * 3600;
    let minute = t.substring(3, 5);
    minute = minute * 60;
    let second = t.substring(6);
    second = parseFloat(second)
    return hour + minute + second
}

// function 이름 : getPoints
// function 설명 : 사용자가 Submit 버튼을 눌렀을 때 실행됩니다. 거리와 초를 각각 getInfo와 getSeconds를 통해 얻은 후 Formula 함수로 점수(points)를 구합니다. clacEquivalents 함수에 점수(points)인자를 넣고 호출합니다.
// function input : None
// function output : None
function getPoints() {
    let seconds = getSeconds();
    if (isNaN(seconds)) {
        return;
    }
    let distance = getInfo().distance;
    let points = Math.round(Formula(distance, seconds));
    if (isNaN(points)) {
        alert("Please fill it out according to the format. \n ex) 03:16:54, 00:18:54")
        window.location.reload()
    }
    calcEquivalents(points)
}

// function 이름 : Formula
// function 설명 : 거리와 기록(초)을 인풋으로 넣으면 점수를 반환하고, 거리와 점수를 인풋으로 넣으면 기록(초)을 반환합니다.
// function input : 거리, 기록 or 점수
// function output : 기록 -> 점수, 점수 -> 기록
function Formula(distance, divisor) {
    return (141113 * Math.pow(distance, 1.0689) / divisor);
}

// function 이름 : formatTime
// function 설명 : 시간을 인자로 받고 웹에서 보여지는 형식으로 변환하여 출력합니다.
// function input : 기록(초)
// function output : "hh:mm:ss" 형식의 아웃풋을 출력합니다.
function formatTime(record) {
    sTime = "";
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    record = Math.round(record);

    hours = Math.floor(record/3600);
    minutes = Math.floor((record - (hours * 3600))/60);
    seconds = record - hours * 3600 - minutes * 60;

    head = "00"
    if (hours > 9) {
        head = hours    
    } else if (hours > 0) {
        head = "0" + hours
    }
    body = "00"
    if (minutes > 9) {
        body = minutes    
    } else if (minutes > 0) {
        body = "0" + minutes
    }
    tail = "00"
    if (seconds > 9) {
        tail = seconds    
    } else if (seconds > 0) {
        tail = "0" + seconds
    }

    sTime = head + ":" + body + ":" + tail;
    return sTime;
}

// function 이름 : formatPace
// function 설명 : 거리와 시간을 인자로 받고 웹에서 보여지는 형식으로 변환하여 출력합니다.
// function input : 거리(km), 기록(초) 
// function output : "hh:mm:ss" 형식의 아웃풋을 출력합니다.
function formatPace(distance, record) {
    sPace = "";
    let minutes = 0;
    let seconds = 0;
    record = Math.round(record);
    paceSec = Math.floor(record/distance);
    minutes = Math.floor(paceSec/60);
    seconds = Math.floor(paceSec - (minutes * 60));
    
    head = minutes
    tail = "00"
    if (seconds > 9) {
        tail = seconds    
    } else if (seconds > 0) {
        tail = "0" + seconds
    }
    sPace = head + ":" + tail
    return sPace;
}

// function 이름 : clacEquivalents
// function 설명 : format함수들로 결정한 결과들을 웹에 붙여넣습니다.
// function input : 기록(초)
// function output : None
function calcEquivalents(points) {
    $('#time_3000m').empty().append(`${formatTime(Formula(3, points))}`);
    $('#time_5km').empty().append(`${formatTime(Formula(5, points))}`);
    $('#time_10km').empty().append(`${formatTime(Formula(10, points))}`);
    $('#time_half').empty().append(`${formatTime(Formula(21.0975, points))}`);
    $('#time_full').empty().append(`${formatTime(Formula(42.195, points))}`);
    $('#pace_3000m').empty().append(`${formatPace(3, Formula(3, points))}`);
    $('#pace_5km').empty().append(`${formatPace(5, Formula(5, points))}`);
    $('#pace_10km').empty().append(`${formatPace(10, Formula(10, points))}`);
    $('#pace_half').empty().append(`${formatPace(21.0975, Formula(21.0975, points))}`);
    $('#pace_full').empty().append(`${formatPace(42.195, Formula(42.195, points))}`);
}

// function 이름 : getPointsMile
// function 설명 : 사용자가 Submit 버튼을 눌렀을 때 실행됩니다. 거리와 초를 각각 getInfo와 getSeconds를 통해 얻은 후 Formula 함수로 점수(points)를 구합니다. clacEquivalents 함수에 점수(points)인자를 넣고 호출합니다.(mile)
// function input : None
// function output : None
function getPointsMile() {
    let seconds = getSeconds();
    if (isNaN(seconds)) {
        return;
    }
    let distance = getInfo().distance;
    distance = distance * 1.609344
    let points = Math.round(Formula(distance, seconds));
    if (isNaN(points)) {
        alert("Please fill it out according to the format. \n ex) 03:16:54, 00:18:54")
        window.location.reload()
    }
    calcEquivalentsMile(points)
}

// function 이름 : clacEquivalentsMile
// function 설명 : format함수들로 결정한 결과들을 웹에 붙여넣습니다.(mile)
// function input : 기록(초)
// function output : None
function calcEquivalentsMile(points) {
    $('#time_mile').empty().append(`${formatTime(Formula(1* 1.609344, points))}`);
    $('#time_5mile').empty().append(`${formatTime(Formula(5* 1.609344, points))}`);
    $('#time_10mile').empty().append(`${formatTime(Formula(10* 1.609344, points))}`);
    $('#time_half').empty().append(`${formatTime(Formula(21.0975, points))}`);
    $('#time_full').empty().append(`${formatTime(Formula(42.195, points))}`);
    $('#pace_mile').empty().append(`${formatPaceMile(1* 1.609344, Formula(1* 1.609344, points))}`);
    $('#pace_5mile').empty().append(`${formatPaceMile(5* 1.609344, Formula(5* 1.609344, points))}`);
    $('#pace_10mile').empty().append(`${formatPaceMile(10* 1.609344, Formula(10* 1.609344, points))}`);
    $('#pace_half').empty().append(`${formatPaceMile(21.0975, Formula(21.0975, points))}`);
    $('#pace_full').empty().append(`${formatPaceMile(42.195, Formula(42.195, points))}`);
}

// function 이름 : formatPaceMile
// function 설명 : 거리와 시간을 인자로 받고 웹에서 보여지는 형식으로 변환하여 출력합니다.(mile)
// function input : 거리(km), 기록(초) 
// function output : "hh:mm:ss" 형식의 아웃풋을 출력합니다.
function formatPaceMile(distance, record) {
    sPace = "";
    let minutes = 0;
    let seconds = 0;
    distance = distance / 1.609344
    record = Math.round(record);
    paceSec = Math.floor(record/distance);
    minutes = Math.floor(paceSec/60);
    seconds = Math.floor(paceSec - (minutes * 60));
    
    head = minutes
    tail = "00"
    if (seconds > 9) {
        tail = seconds    
    } else if (seconds > 0) {
        tail = "0" + seconds
    }
    sPace = head + ":" + tail
    return sPace;
}