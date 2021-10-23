var prediction = ""

Webcam.set({
    width:330,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";
    });
}

console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/UcL0M7Dm_/model.json",modelLoaded)

function modelLoaded(){
    console.log("model is loaded");
}

function speak()
{
    speech = window.speechSynthesis;
    speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    speech.speak(utterThis);
}

function check_gesture(){
    image = document.getElementById("captured_image");
    classifier.classify(image , gotResult)
}

function gotResult(error, result){
    if( error ){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_gesture_name").innerHTML = result[0].label;
        prediction = result[0].label;
        speak();
        if(result[0].label == "amazing"){
            document.getElementById("gesture").innerHTML = "&#128076;";
        }
        if(result[0].label == "yo"){
            document.getElementById("gesture").innerHTML = "&#129311;";
        }
        if(result[0].label == "thumbs-up"){
            document.getElementById("gesture").innerHTML = "&#128077;";
        }
        else{
            document.getElementById("gesture").innerHTML = "&#9996;";
        }
    }
}