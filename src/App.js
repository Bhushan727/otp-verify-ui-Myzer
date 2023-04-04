
import { useRef, useState } from 'react';
import './App.css';

function App() {
  
  const [otp,setOtp] = useState(["","","",""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const formRef = useRef(null);
  const submitButtonRef = useRef(null);

  const handleChange = (index,event) => {
    // if(isNaN(element.value)) return false;

    // setOtp([...otp.map((d,idx) => (idx === index ? element.value : d))]);

    // if(element.nextSibling){
    //   element.nextSibling.focus();
    // }

    const value = event.target.value;

    // update the state array with the new value
    setOtp((prevOTP) => {
      const newOTP = [...prevOTP];
      newOTP[index] = value;
      return newOTP;
    });

     // move the cursor to the next input field
     if (index < inputRefs.length - 1 && value) {
      inputRefs[index + 1].current.focus();
    }else if (index === inputRefs.length - 1 && value) {
      inputRefs[index].current.blur();
      submitButtonRef.current.focus();
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting OTP:", otp.join(""));
  };

  const handleReset = () => {
    // clear the input fields and move the cursor to the first input field
    setOtp(["", "", "", ""]);
    inputRefs[0].current.focus();

    // reset the form
    formRef.current.reset();
  };

  return (
    <div className="App">
      
        {/* left Container */}
        <div className="left_Container">
          {/* logo icon */}
          <img src={process.env.PUBLIC_URL+"LOGO.png"} className="logo_Img" alt="LOGO" />

          <p className="verification">Verification</p>
          <div className="instruction_Box">
            <p className="sms">SMS OTP</p>
            <p className="otp_Demo">Sent on: 77777-77777</p>
          </div>

          {/* input boxes */}
          <form action="" onSubmit={handleSubmit} ref={formRef}>
          <div className="inputs_Container">

            {
              otp.map((value,index)=> {
                return(
                  <input 
                      type="number"
                      className='input_Box'
                      name='otp'
                      key={index}
                      value={value}
                      onChange={event=> handleChange(index,event)}
                      ref={inputRefs[index]}
                      required
                   />
                )
              })
            }

          </div>

          <p className="wrong_Line">Entered Wrong Details? <span className="reEnter" onClick={handleReset}> Re-enter</span></p>
          
          <input type="submit" className='verify_Btn' value="Verify" ref={submitButtonRef} />
          </form>

          <p className="goBack">Go back to Home</p>

        </div>

        {/* Right Container */}
        <div className="right_Container">

          <img src={process.env.PUBLIC_URL+"image-3.png"} className="mesh_Img" alt="" />
          <img src={process.env.PUBLIC_URL+"image-4.png"} className="dashboard_Img" alt="" />

        </div>

    </div>
  );
}

export default App;
