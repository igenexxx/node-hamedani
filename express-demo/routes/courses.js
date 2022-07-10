const express = require('express');
const router = express.Router();

const courses = [{
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
    res.send(courses);
});

router.post('/', (req, res) => {

    const {
        error
    } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.get('/:id', (req, res) => {
    const course = courses.find(course => parseInt(req.params.id, 10) === course.id);
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(course => parseInt(req.params.id, 10) === course.id);
    if (!course) return res.status(404).send('The course with the given ID was not found');

    const {
        error
    } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //Update course
    course.name = req.body.name;

    res.send(course);
});

router.delete('/:id', (req, res) => {
    const courseIndex = courses.find(course => parseInt(req.params.id, 10) === course.id);
    if (!~courseIndex) {
        return res.status(404).send('The course with the given ID was not found');
    }

    const [course] = courses.splice(courseIndex, 1);

    res.send(course);
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;