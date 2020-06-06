'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
    const { router, controller } = app;
    router.resources('class', '/api/class', controller.class);
    router.resources('college', '/api/college', controller.college);
    router.resources('grade', '/api/grade', controller.grade);
    router.resources('user', '/api/user', controller.user);
    router.resources('profession', '/api/profession', controller.profession);
    router.resources('student', '/api/student', controller.student);
    router.resources(
        'announcement',
        '/api/announcement',
        controller.announcement
    );
    router.post('/api/login', controller.login.index);
};