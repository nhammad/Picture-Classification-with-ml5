/**
 * ---------------------------------------------------------
 *
 * 	This component consists of the webcam feature. It allows 
 * 	users to capture pictures, add them to a machine learning 
 * 	model from ml5.js and train/test it using the buttons.
 * 
 * ----------------------------------------------------------
 */

import React, { useRef, useState } from "react";
import Sketch from "react-p5";
import p5Types from "p5"; 
import * as ml5 from "ml5";
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	sketch: {
paddingTop: '15px',
	},
  rightButtons: {
    marginLeft: '10px'
  },
  buttonContainer: {
	paddingTop: '20px',
    justifyContent: 'spaceBetween'
  },
  secondButtonContainer: {
	paddingTop: '15px',
  },
}));

interface VideoComponentProps {
	firstLabel: string;
	secondLabel: string;
	numberOfEpochs: number;
}

export default function VideoComponent(
	props: VideoComponentProps
  ){
	//console.log('NUMBER OF EPOCHS', props.numberOfEpochs)
	const [prediction, setPrediction] = useState<string>();
	const [confidence, setConfidence] = useState<string>();
	const [firstImages, setFirstImages] = useState<number>(0);
	const [secondImages, setSecondImages] = useState<number>(0);
	const [trainingComplete, setTrainingComplete] = useState<boolean>();
	const [lossValue, setLossValue] = useState<number>();
	const classes = useStyles();
  
	let capture: any = useRef<any>();
	let classifier: any = useRef<any>();
  
	function modelReady() {
		console.log("Model Ready");
	  }
	
	  function videoReady() {
		console.log("Video Ready");
	  }
	
	  //setting up the webcam from p5, and featureExtractor/classifier from ml5
  
	  const setup = (p5: p5Types, canvasParentRef: Element) => {
		capture.current = p5.createCapture(p5.VIDEO).parent(canvasParentRef);
		const featureExtractor = ml5.featureExtractor("MobileNet", {epochs: props.numberOfEpochs}, modelReady);
		classifier.current = featureExtractor.classification(
		  capture.current,
		  videoReady
		);
	  };
	
	  const draw = (p5: p5Types) => {
	  };
	
	  // ml5 returns a "result" value that includes a prediction and confidence value
	  // here, we save the returned values to be displayed on the screen
  
	  function gotResult() {
		classifier.current.classify(capture.current, (err: any, result: any) => {
			console.log('result', result)
		  setPrediction(result[0].label);
		  setConfidence(result[0].confidence);
		});
	  }
	
	  function train() {
		classifier.current.train((lossValue: number ) => {
		  console.log("Loss is", lossValue);
		  if (lossValue) {
			  setLossValue(lossValue)
			}
		  if (lossValue == null) {
			setTrainingComplete(true);
			console.log("training complete");
		  }
		});
	  }
  
	  function resetResults() {
		  setTrainingComplete(false);
		  setPrediction('');
		  setConfidence('');
		  setFirstImages(0);
		  setSecondImages(0);
		}
	
		// for counting number of images added 
		function firstImageAdded() {
		  setFirstImages(firstImages+1)
		}
  
		function secondImageAdded() {
		  setSecondImages(secondImages+1)
		}
  
	  return (
		<div>
		  <Sketch setup={setup} draw={draw} className={classes.sketch} />
		  <div className={classes.buttonContainer}>
			<Button
			  variant="contained"
			  color="primary"
			  onClick={() => {
				classifier.current.addImage(props.firstLabel ? props.firstLabel : 'First', firstImageAdded());
				console.log("image added");
			  }}
			>
			  {props.firstLabel ? props.firstLabel : 'First'}
			</Button>
			<Button
			  variant="contained"
			  className={classes.rightButtons}
			  color="primary"
			  onClick={() => {
				classifier.current.addImage(props.secondLabel ? props.secondLabel : 'Second', secondImageAdded() );
				console.log("image added");
			  }}
			>
			  {props.secondLabel ? props.secondLabel : 'Second'}
			</Button>
		  </div>
		  {firstImages} images added for {props.firstLabel ? props.firstLabel : 'First'}
		  <br/>
			  {secondImages} images added for {props.secondLabel ? props.secondLabel : 'Second'}
		  <div className={classes.secondButtonContainer}>
			<Button variant="contained" color="primary" onClick={() => train()}>
			  Train!
			</Button>
			<Button variant="contained" color="primary" className={classes.rightButtons} onClick={() => gotResult()}>
			  Test!
			</Button>
			<br />
			{trainingComplete && <span>Training Complete!</span>}
			<br />
			<span>Prediction: {prediction}</span>
			<br />
			<span>Confidence: {confidence}</span>
			<br />
			<span>Final Loss: {trainingComplete ? lossValue : ''}</span>
			<br />
			<Button variant="contained" color="primary" onClick={() => resetResults()}>
			  Reset
			</Button>
		  </div>
		</div>
	  );
	};
  