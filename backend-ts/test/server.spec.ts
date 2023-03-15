import { describe, it } from 'mocha';
import request from "supertest";
import { expect } from "chai";

import startServer from '../src/driver/startServer';
import connectDB from '../src/db/connection';

const app = startServer();
connectDB();

/**
 * Check the Server
 */

describe("server checks", function () {
  it("server instantiated without error", function (done) {
    request(app).get("/ping").expect(200, done);
  });
});

export default app;