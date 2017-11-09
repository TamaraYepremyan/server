require('dotenv').load();
var http = require('http');
var path = require('path');
var AccessToken = require('twilio').jwt.AccessToken;
var SyncGrant = AccessToken.SyncGrant;
var express = require('express');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/token', function (request, response) {
    var identity = authenticatedSenderOf(request);
    var syncGrant = new SyncGrant({
        serviceSid: process.env.TWILIO_SYNC_SERVICE_SID,
    });
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );
    token.addGrant(syncGrant);
    token.identity = identity;
    response.send(
        {
            identity: identity,
            token: token.toJwt()
        }
    );
});
var server = http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log('Express server running on *:' + port);


