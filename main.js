var SpeechRecognition = window.webkitSpeechRecognition;
var Recognition = new SpeechRecognition();
function Start() {
    document.getElementById("textbox").innerHTML = "";
    Recognition.start();
}
Recognition.onresult = function (event) {
    var content = event.results[0][0].transcript;
    console.log(event);
    console.log(content);
    document.getElementById("textbox").innerHTML = content;
    if (content == "take my selfie") {
        speak();
    }
}
function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "taking your selfie in five seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function () {
        take_snapshot();
        save();
    }, 5000);
}
camera = document.getElementById("camera");
Webcam.set({
    width: 360,
    height: 250,
    image_format: 'jpeg',
    jpeg_quality: 90
});
function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("results").innerHTML = '<img id="selfie_img" src="' + data_uri + '">';
    });
}
function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_img").src;
    link.href = image;
    link.click();
}