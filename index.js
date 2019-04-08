const express = require('express');
const app = express();
const path = require('path');

const tts_start="<response><playtext>";
const tts_end="</playtext></response>"

app.get('/', (req, res) => {
    console.log("Incoming Request:");
    console.log('Event:'+req.query.event);
    console.log('Data:'+req.query.data);
    res.sendFile('request.xml', { root: path.join(__dirname, './') });
});

app.get('/age',(req,res)=>{
    console.log("Incoming Request:",req.url);
    console.log('Event:' + req.query.event);
    console.log('Data:' + req.query.data);

    if(req.query.data==='1'){
        res.sendFile('male.xml', { root: path.join(__dirname, './') });
    }else if(req.query.data==='2'){
        res.sendFile('female.xml', { root: path.join(__dirname, './') });
    }

});

app.get('/isadult',(req,res)=>{
    if (req.query.data === '1') {
        res.send(tts_start+"You are an adult"+tts_end);
    } else if (req.query.data === '2') {
        res.send(tts_start+"Minors are not allowed"+tts_end);
    }
    res.send('<response><hangup></hangup></response>')
});

const port = 5000;

app.listen(port, () => {
    console.log(`Listening on Port:${port}`);
});