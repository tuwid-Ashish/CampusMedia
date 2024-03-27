// try {
//     const response = await fetch(
//       "http://localhost:4000/api/v1/users/signup",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );
//     const result = await response.json();
//     if (result) {
//       dispatch(login(result));
//       navigate(`/profile/${result._id}`);
//     }
//   } catch (error) {
//     seterror(result.message);
//   }

function generateVerificationCode() {
  let verificationCode = Math.floor(100000 + Math.random() * 900000);
  return verificationCode;
}

console.log(generateVerificationCode());