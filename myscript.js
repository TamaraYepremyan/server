
function fetchAccessToken(handler) {
    var http = new XMLHttpRequest;
    var url = "/token";
    http.open("get", url, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(http.responseText.token);
            console.log(http.responseText.identity);
        }
        //handler(http.responseText);
    };
    http.send();
}