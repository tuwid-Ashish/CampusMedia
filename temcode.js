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

export default function (context, req) {
  context.log(
    "Node.js HTTP trigger function processed a request. RequestUri=%s",
    req.originalUrl
  );
  if (req.query.name || (req.body && req.body.name)) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: { name: req.query.name || req.body.name },
    };
  } else {
    context.res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body",
    };
  }
  context.res.headers = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "http://localhost",
    "Access-Control-Allow-Origins": "http://localhost",
    "Content-Type": "application/json",
  };
  context.done();
}
