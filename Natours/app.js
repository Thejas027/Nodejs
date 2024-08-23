const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // middleware--> function, modifies the request data(stands b/w request and response)

// reading the data from the text file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get to get all the tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

//to get a particular tour with a id --> creating a variable to it
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length || !tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'INVALID id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
});

// post to create a new tour, where data can be sent to client to server
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// patch method --> to update the tour

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'INVALID id',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here.../>',
    },
  });
});

// deleting a tour

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'INVALID id',
    });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// listening to the port
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port : ${port}...`);
});
