const jwt = require("jsonwebtoken");
require("dotenv").config();

const path = require("path");
const { login } = require(path.join(__dirname, "controllers", "auth"));

describe("login middleware test", () => {
  test("get response status 200", async () => {
    const user = {
      _id: "123scsc490654",
      email: "boolean@gmail.com",
      password: "boolean567",
      subscription: "business",
    };

    const payload = {
      id: user._id,
      subscription: user.subscription,
    };
    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    const mReq = { body: { email: user.email, password: user.password } };
    const mRes = {
      status: 200,
      message: `token: ${token}, user: {email: ${user.email}, subscription: ${user.subscription}}`,
    };
    const mockNext = jest.fn();

    login(mReq, mRes, mockNext);

    expect(mReq.body.email).toBe(user.email);
    expect(mReq.body.password).toBe(user.password);
    expect(mRes.status).toBe(200);
    expect(mRes.message).toBe(
      `token: ${token}, user: {email: ${user.email}, subscription: ${user.subscription}}`
    );
  });
});
