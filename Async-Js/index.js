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

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro("dog-image.txt", res.body.message);
    console.log("Random dog imagae saved to file");
  } catch (err) {
    console.log(err.message);
  }
};

getDogPic();
