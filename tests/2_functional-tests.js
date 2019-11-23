/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http');
const chai = require('chai');

const server = require('../dist/server');

const { assert } = chai;


chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('POST /api/issues/{project} => object with issue data', () => {
    test('Every field filled in', (done) => {
      chai.request('http://localhost:3000')
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA',
        })
        .end((err, res) => {
          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'open');
          assert.property(res.body, 'status_text');
          assert.property(res.body, '_id');
          assert.equal(res.status, 200);

          done();
        });
    });

    test('Required fields filled in', (done) => {
      chai.request('http://localhost:3000')
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
        })
        .end((err, res) => {
          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'open');
          assert.property(res.body, '_id');
          assert.equal(res.status, 200);

          done();
        });
    });

    test('Missing required fields', (done) => {
      chai.request('http://localhost:3000')
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA',
        })
        .end((err, res) => {

          assert.equal(res.status, 400);
          assert.isDefined(res.text);
          done();
        });
    });
  });

  suite('PUT /api/issues/{project} => text', () => {
    test('No body', (done) => {
      chai.request('http://localhost:3000')
        .put('/api/issues/test')
        .send({})
        .end((err, res) => {

          assert.equal(res.status, 400);
          assert.isDefined(res.text);
          done();
        });
    });

    test('One field to update', (done) => {
      let id;
      chai.request('http://localhost:3000')
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
        })
        .end((err, res) => {
          id = res.body._id;
          chai.request('http://localhost:3000')
            .put('/api/issues/test')
            .send({ _id: id, issue_text: 'text2' })
            .end((err, res) => {
              assert.strictEqual(res.text, `successfully updated ${id}`);
              assert.equal(res.status, 200);
              done();
            });
        });
    });

    test('Multiple fields to update', (done) => {
      let id;
      chai.request('http://localhost:3000')
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
        })
        .end((err, res) => {
          id = res.body._id;
          chai.request('http://localhost:3000')
            .put('/api/issues/test')
            .send({ _id: id, issue_text: 'text2', issue_title: 'new title' })
            .end((err, res) => {
              assert.strictEqual(res.text, `successfully updated ${id}`);
              assert.equal(res.status, 200);
              done();
            });
        });
    });
  });

  suite('GET /api/issues/{project} => Array of objects with issue data', () => {
    test('No filter', (done) => {
      chai.request('http://localhost:3000')
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
        }).end((err, res) => {
          chai.request('http://localhost:3000')
            .get('/api/issues/test')
            .query({})
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isArray(res.body);
              assert.property(res.body[0], 'issue_title');
              assert.property(res.body[0], 'issue_text');
              assert.property(res.body[0], 'created_on');
              assert.property(res.body[0], 'updated_on');
              assert.property(res.body[0], 'created_by');
              assert.property(res.body[0], 'assigned_to');
              assert.property(res.body[0], 'open');
              assert.property(res.body[0], 'status_text');
              assert.property(res.body[0], '_id');
              done();
            });
        });
    });

    test('One filter', (done) => {
      chai.request('http://localhost:3000')
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
        }).end((err, res) => {
          chai.request('http://localhost:3000')
            .get('/api/issues/test')
            .query({ issue_title: 'Title' })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isArray(res.body);
              assert.property(res.body[0], 'issue_title');
              assert.property(res.body[0], 'issue_text');
              assert.property(res.body[0], 'created_on');
              assert.property(res.body[0], 'updated_on');
              assert.property(res.body[0], 'created_by');
              assert.property(res.body[0], 'assigned_to');
              assert.property(res.body[0], 'open');
              assert.property(res.body[0], 'status_text');
              assert.property(res.body[0], '_id');
              assert.equal(res.body[0].issue_title, 'Title');
              done();
            });
        });
    });

    test('Multiple filters (test for multiple fields you know will be in the db for a return)', (done) => {
      chai.request('http://localhost:3000')
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
        }).end((err, res) => {
          chai.request('http://localhost:3000')
            .get('/api/issues/test')
            .query({ issue_title: 'Title', issue_text: 'text' })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isArray(res.body);
              assert.property(res.body[0], 'issue_title');
              assert.property(res.body[0], 'issue_text');
              assert.property(res.body[0], 'created_on');
              assert.property(res.body[0], 'updated_on');
              assert.property(res.body[0], 'created_by');
              assert.property(res.body[0], 'assigned_to');
              assert.property(res.body[0], 'open');
              assert.property(res.body[0], 'status_text');
              assert.property(res.body[0], '_id');
              assert.equal(res.body[0].issue_title, 'Title');
              done();
            });
        });
    });
  });

  suite('DELETE /api/issues/{project} => text', () => {
    test('No _id', (done) => {
      chai.request('http://localhost:3000')
        .delete('/api/issues/test')
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });
    test('Valid _id', (done) => {
      let id;
      chai.request('http://localhost:3000')
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
        })
        .end((err, res) => {
          id = res.body._id;
          chai.request('http://localhost:3000')
            .delete('/api/issues/test')
            .send({ _id: id })
            .end((err, res) => {
              assert.strictEqual(res.text, `successfully deleted ${id}`);
              assert.equal(res.status, 200);
              done();
            });
        });
    });
  });
});
