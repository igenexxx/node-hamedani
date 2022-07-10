const express = require('express');
const router = express.Router();


router.use(express.json());

const genres = [{
    id: 1,
    name: 'course1'
},
{
    id: 2,
    name: 'course2'
},
{
    id: 3,
    name: 'course3'
},
]

router.get('/', (req, res) => {
    res.send("Hello, world!");
});

router.get('/api/genres', (req, res) => {
    res.send(genres);
});

router.post('/api/genres/', (req, res) => {

    const {
        error
    } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(course);
    res.send(course);
});

router.get('/api/genres/:id', (req, res) => {
    const course = genres.find(course => parseInt(req.params.id, 10) === course.id);
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

router.put('/api/genres/:id', (req, res) => {
    const course = genres.find(course => parseInt(req.params.id, 10) === course.id);
    if (!course) return res.status(404).send('The course with the given ID was not found');

    const {
        error
    } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //Update course
    course.name = req.body.name;

    res.send(course);
});

router.delete('/api/genres/:id', (req, res) => {
    const courseIndex = genres.find(course => parseInt(req.params.id, 10) === course.id);
    if (!~courseIndex) {
        return res.status(404).send('The course with the given ID was not found');
    }

    const [course] = genres.splice(courseIndex, 1);

    res.send(course);
})

function validateGenre(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;
