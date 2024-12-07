import React from "react";
import { useModal } from "../../context/Modal"; // Correctly import from context
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";

function Navigation() {
  const { setModalContent } = useModal(); // Use the modal context to open the modal

  const openLoginModal = () => {
    setModalContent(<LoginFormModal />); // Open login modal
  };

  const openSignupModal = () => {
    setModalContent(<SignupFormModal />); // Open signup modal
  };

  return (
    <nav>
      <ul>
        {/* <li>MyApp</li>
        <li>About</li>
        <li>Contact</li> */}
        <li>
          <button onClick={openLoginModal}>Log In</button>
          <button onClick={openSignupModal}>Sign Up</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;



// import React from 'react';
// import { useModal } from '../../context/Modal'; // Correctly import from context

// function Navigation() {
//   const { setModalContent } = useModal(); // Use the modal context to open the modal

//   const openModal = () => {
//     setModalContent(<div>Here's the modal content!</div>); // Set the modal content
//   };

//   return (
//     <nav>
//       <ul>
//         <li>MyApp</li>
//         <li>About</li>
//         <li>Contact</li>
//         <li>
//           <button onClick={openModal}>Profile</button>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navigation;
