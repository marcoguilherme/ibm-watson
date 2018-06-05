const express = require('express');
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

var wav = require('wav');
var Speaker = require('speaker');

let app = express();

app.use(express.static('public'));

app.get('/', function(req, res){

    var textToSpeech = new TextToSpeechV1({
        username: '{username}', 
        password: '{password}',
        url: 'https://stream.watsonplatform.net/text-to-speech/api/'
    });

    var params = {
        text: 'Eu achei o watson muito legal',
        voice: 'pt-BR_IsabelaVoice',
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

            var arquivo = fs.createReadStream('audio.wav') 
            var reader = new wav.Reader();

            reader.on('format', function (format) { 
                // the WAVE header is stripped from the output of the reader
                reader.pipe(new Speaker(format));
            });
            arquivo.pipe(reader);
            console.log(arquivo);
            res.send('Look for a file called audio.wav on you project folder');
    })
})


app.listen(3000, (req, res)=>{
    console.log('running...')
})