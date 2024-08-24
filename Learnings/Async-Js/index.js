const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file 😢");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 😢");
      resolve("success");
    });
  });
};

// 1.call back hell
/*
fs.readFile(`${__dirname}/dog.txt`, (error, data) => {
  if (error) {
    console.error("Error reading the file:", error);
    return;
  }

  const breed = data.toString().trim(); // Convert buffer to string and trim any whitespace
  console.log(`Breed: ${breed}`);

  superagent
    .get(`https://dog.ceo/api/breed/${breed}/images/random`)
    .end((err, res) => {
      if (err) {
        console.error("Error fetching dog image:", err);
        return;
      }

      const dogImage = res.body.message;
      console.log(dogImage);

      fs.writeFile("dog-image.txt", dogImage, (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("Random dog image saved to file");
        }
      });
    });
});

*/

// 2. using then and user created promises

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed : ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro(`dog-image.jpg`, res.body.message);
  })
  .then(() => {
    console.log("random dog image saved to file!");
  })
  .catch((err) => {
    console.log(err.message);
  });
*/

// 3. using async function
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);

    console.log(imgs);

    await writeFilePro("dog-image.txt", imgs.join("\n"));
    console.log("Random dog image saved to file");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: Ready 🐶";
};

//----> making returning the string from the async function gives the correct results of console.log's

/*
1.if this is done the promise will be still pending
console.log("1: Will get dog pics");
const x = getDogPic();
console.log(x);
console.log("3: Done getting dog pictures");
*/

/* 2. but using another then promise give the correct results of console.log's
console.log("1: Will get dog pics");
getDogPic()
  .then((x) => console.log(x))
  .catch((err) => console.log("ERROR 💥"));
console.log("3: Done getting dog pictures");
*/

/*    USING ASYNC AWAIT */
(async () => {
  try {
    console.log("1: Will get dog pics");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pictures");
  } catch (err) {
    console.log("ERROR 💥");
  }
})();
