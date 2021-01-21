import React, { useRef } from 'react';
import './App.css';
import* as tf from "@tensorflow/tfjs";
import* as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";


function App() {

  const webcamRef = useRef(null);
const canvasRef = useRef(null);

// load facemesh
const runFacemesh = async () =>{
  const net = await facemesh.load({
    inputResolution: { 
      width:640, 
      height:400, 
      scale:0.8 }
  });
  setInterval(() =>{
    detect(net)
  }, 100)
};

// dection function
 const detect = async (net) => {
  if ( 
    typeof webcamRef.current !=="undefined" && 
  webcamRef.current !== null && 
  webcamRef.current.video.readyState === 4
  ) {
    // get video props
const video = webcamRef.current.video;
const videoWidth = webcamRef.current.video.videoWidth;
const videoHeight = webcamRef.current.videoHeight;


//  setting the video width and canvas width
webcamRef.current.video.width = videoWidth;
webcamRef.current.video.height = videoHeight;

canvasRef.current.width = videoWidth;
canvasRef.current.height = videoHeight;

// Detection
const face = await net.estimateFaces(video);
console.log(face);

}
};

runFacemesh();

  return (
    <div className="App">
      <header className="App-header">
     <Webcam ref={webcamRef} style={
       {
         position:'absoulute',
         marginLeft: "auto",
         marginRight:"auto",
         left:0,
         right:0,
         textAlign:"center",
         zIndex:9,
         width:640,
         height:400,
       }
      } />
      <canvas ref={canvasRef}
style={
  {
    position:'absoulute',
    marginLeft: "auto",
    marginRight:"auto",
    left:0,
    right:0,
    textAlign:"center",
    zIndex:9,
    width:640,
    height:400,
  }
 } />
 </header>
    </div>
  );
}

export default App;
