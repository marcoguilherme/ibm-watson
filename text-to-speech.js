const express = require('express');
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

let app = express();

app.get('/', function(req, res){

    var textToSpeech = new TextToSpeechV1({
        username: '{username}',
        password: '{password}',
        url: 'https://stream.watsonplatform.net/text-to-speech/api/'
    });

    var params = {
        text: 'My name is Marco and i am a developer! Yep yep, urra',
        voice: 'en-US_AllisonVoice', // Optional voice
        accept: 'audio/wav'
    };

    textToSpeech
        .synthesize(params, (err, audio)=>{
            if(err){
                console.log('Error trying to synthesize text. ' + err)
                return;
            }

            textToSpeech.repairWavHeader(audio);
            fs.writeFileSync('audio.wav', audio);
            res.send('take a look on your root folder a file with name audio.wav');
    })
})


app.listen(3000, (req, res)=>{
    console.log('running...')
})