import { Link } from "react-router-dom";
import {AuthView} from "../../config/auth";
// import "../styles/temp.css"
// import PropTypes from "prop-types"; // Import PropTypes
// import {AuthView} from "../../config/auth";

export default function NavigationButtons() {
    return (
        <div id="nav-bar" className="w-full px-6 py-4 bg-white shadow-md">
          <div className="flex justify-between items-center">
            {/* Left: Home Button */}
            <div className="flex items-center gap-4">
              {SingleButton('Home')}
            </div>
    
            {/* Right: Settings + AuthView */}
            <div className="flex items-center gap-4">
              <AuthView />
              {SingleButton('Settings')}
            </div>
          </div>
        </div>
      );
  }
//function that returns the html code for a button based on the string passed in 
function SingleButton(button : string){
  const nameToData = 
  {
      'Home' : {
          text : 'Home',
          link : '/'
      },
      'Settings' : { 
          text : 'Settings',
          link : '/Settings'
      },
  };

  const errorContent = {
      text : 'N/A',
      link : '/'
  }
  

  //https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript
  const content = nameToData[button as keyof typeof nameToData] || errorContent;

  return(
      <Link className="nav-button" to={content.link}>
          {content.text}
      </Link>
  );
}



// NOTE: alternative way is to define a prop type, 
// this is the better way to do it but I need to do it the dumb way first

// interface SingleButtonProps {
//     button: string;
//   }

// function SingleButton({ button }: SingleButtonProps) { ...}


// Prop type was needed for JS
// SingleButton.propTypes = {
//     button: PropTypes.string.isRequired,
//   };