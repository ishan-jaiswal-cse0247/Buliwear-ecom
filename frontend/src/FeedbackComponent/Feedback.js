import './Feedback.css'
function Feedback(props) {
  return( 
  <div id='main1'>
    <h3>Feedback</h3>
    
      <p>Value of a and b from Contact is {props.a}&nbsp;and&nbsp;{props.b}</p>
      <p> Ans from Contact is = {props.c}</p>
  </div>
  );
}

  export default Feedback;