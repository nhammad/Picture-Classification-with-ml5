/**
 * ---------------------------------------------------------------------------------
 *
 * 	This is a container component for all things appearing on the
 *  HomePage including instructions text, buttons, and the VideoComponent.
 * 
 * ----------------------------------------------------------------------------------
 */


 import { useState } from 'react';
 import PermanentDrawerLeft from '../../components/PermanentDrawerLeft';
 import VideoComponent from "../../components/VideoComponent";
 import { Button, makeStyles, TextField } from '@material-ui/core';
 
 const useStyles = makeStyles((theme) => ({
     root: {
         '& > *': {
             margin: theme.spacing(1),
             width: '25ch',
         },
     },
     content: {
         paddingLeft: '200px',
         paddingTop: '100px',
         backgroundColor: 'white',
         display: 'flex',
         flexDirection: 'row-reverse',
         paddingBottom: '60px'
     },
     buttons: {
         marginLeft: '10px'
     },
     heading: {
         fontSize: '20px'
     },
     text: {
         marginLeft: '35px',
         marginRight: '25px',
         marginTop: '5px',
         textAlign: 'justify',
     },
     epochsText: {
 paddingLeft: '440px'
     },
 }));
 
 export default function PanelHomePage() {
 
     const [firstLabel, setFirstLabel] = useState<string>('');
     const [secondLabel, setSecondLabel] = useState<string>('');
     const [disabled, setDisabled] = useState(false);
     const [savedLabels, setSavedLabels] = useState(false);
     const [numberOfEpochs, setNumberOfEpochs] = useState<number>(20);
     const classes = useStyles();
 
     const saveLabels = () => {
         setDisabled(true);
         setSavedLabels(true);
         console.log("first label", firstLabel);
       };
     
       const resetLabels = () => {
         setFirstLabel("");
         setSecondLabel("");
         setDisabled(false);
         console.log("first label", firstLabel);
       };
     
       return (
         <div>
           <PermanentDrawerLeft></PermanentDrawerLeft>
           <main className={classes.content}>
             <div className={classes.text}>
               <p>
                 Build and test your own image classifier using ml5.js!
               </p>
               <div className={classes.heading}>Instructions</div>
               <p>
                 <strong>Prediction Confidence:</strong> A value between 0 to 1
                 indicating how confident our machine learning model is about its
                 returned prediction.
                 <br /> <br />
                 <strong>Loss: </strong> A number indicating how poor the model's
                 prediction was on a single test example.
                 <br /> <br />
                 <strong>Epochs: </strong> The number of epochs defines how many
                 times the learning algorithm will work through the entire training
                 data set.
               </p>
               <p>
                 Select two different objects, save their labels below, and capture 3
                 pictures of each. <br /> <br />
                 Once you're done, click on the Train button. By "training", you are
                 teaching your machine learning algorithm about which image
                 represents which object (first or second?). Once you see a
                 notification that the training is complete, capture another picture
                 of one of the two items you used by clicking on the Test button. Now,
                 see the predictions below and observe the accuracy. Every time you
                 click on the Test button, a new picture will be captured and tested
                 via your webcam. You can also play around with the number of epochs.
                 If you change the default value from 20 to 1, you will observe a
                 significant drop in the prediction confidence values. This depicts
                 how crucial it is to set optimal parameters while building machine
                 learning models.
               </p>
               <p className={classes.epochsText}>Number of Epochs:</p>
               <form className={classes.root} noValidate autoComplete="off">
                 <TextField
                   id="filled-basic"
                   value={firstLabel}
                   label="First Label"
                   variant="filled"
                   onChange={(event) => {
                     setFirstLabel(event.target.value);
                   }}
                   disabled={disabled}
                 />
                 <TextField
                   id="filled-basic"
                   value={secondLabel}
                   label="Second Label"
                   variant="filled"
                   onChange={(event) => {
                     setSecondLabel(event.target.value);
                   }}
                   disabled={disabled}
                 />
                 <TextField
                   id="filled-basic"
                   value={numberOfEpochs}
                   variant="filled"
                   type="number"
                   inputProps={{ min: 1, max: 20, step: "1" }}
                   onChange={(event) => {
                     setNumberOfEpochs(parseInt(event.target.value));
                   }}
                 />
               </form>
               <Button
                 variant="contained"
                 color="primary"
                 onClick={() => saveLabels()}
               >
                 Save Labels
               </Button>
               <Button
                 className={classes.buttons}
                 variant="contained"
                 color="primary"
                 onClick={() => resetLabels()}
               >
                 Reset Labels
               </Button>
               <br />
             </div>
             <div className="video">
               <VideoComponent
                 firstLabel={savedLabels ? firstLabel : "First"}
                 secondLabel={savedLabels ? secondLabel : "Second"}
                 numberOfEpochs={numberOfEpochs ? numberOfEpochs : 20}
               />
             </div>
           </main>
         </div>
       );
     }
     