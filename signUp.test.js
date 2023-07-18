const path = require("path");
const { signUp } = require(path.join(__dirname, "controllers", "auth"));

describe("signUp middleware test", () => {
  test("get response status 201 and success sign up message", async () => {
    const user = {
      email: "boolean@gmail.com",
      password: "boolean567",
      subscription: "business",
    };

    const mReq = { body: user };
    const mRes = {
      status: 201,
      message: `Success sign up user: {"email": ${user.email}, "subscription": ${user.subscription}}`,
    };
    const mockNext = jest.fn();

    signUp(mReq, mRes, mockNext);

    expect(mReq.body.email).toBe(user.email);
    expect(mReq.body.password).toBe(user.password);
    expect(mRes.status).toBe(201);
    expect(mRes.message).toBe(
      `Success sign up user: {"email": ${user.email}, "subscription": ${user.subscription}}`
    );
  });
});
