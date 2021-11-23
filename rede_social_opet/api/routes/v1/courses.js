import { Course } from './../../models/course.js';
import { db } from '../../db.js';
import seq from 'sequelize';
const { QueryTypes } = seq;

function courseRoutes(router) {
  getAllCourses(router);

  return router;
}

function getAllCourses(router) {
  router.get('/courses', async (req, res) => {
    let courses = await Course.findAll();
    const studentId = res.locals.studentId;

    const sql = `
      SELECT c.*
      FROM students_course_periods scp
      INNER JOIN course_periods cp ON cp.id = scp.course_period_id
      INNER JOIN courses c ON c.id = cp.course_id
      WHERE scp.student_id = ? LIMIT 1`;
    
    const coursePeriods = await db.query(sql, {
      replacements: [studentId],
      type: QueryTypes.SELECT,
    });

    const [ studentCourse ] = coursePeriods;

    courses.filter(course => course.id !== studentCourse.id).unshift(courses);

    return res.json({ courses });
  });
}

export default courseRoutes;
