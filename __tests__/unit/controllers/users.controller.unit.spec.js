import { UsersController } from "../../../src/controllers/users.controller";
import { StatusCodes } from "../../../src/utils/constants/constants.js";
import { jest } from "@jest/globals";

let mockUsersService = {
  signUp: jest.fn(),
  login: jest.fn(),
  getUserInfo: jest.fn()
};

let usersController = new UsersController(mockUsersService);

describe("Users Controller Unit Test", () => {
  let mockRequest = {};
  let mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn()
  };
  let mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("signUp Method", async () => {
    const mockUser = {
      id: 1,
      email: "test@test.com",
      password: "test",
      name: "test"
    };
    mockUsersService.signUp.mockResolvedValue(mockUser);
    mockRequest.body = {
      email: "test@test.com",
      password: "test",
      name: "test"
    };

    await usersController.signUp(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "회원가입에 성공했습니다.",
      data: mockUser
    });
  });

  test("login Method", async () => {
    const mockUser = { id: 1, email: "test@test.com", password: "test" };
    mockUsersService.login.mockResolvedValue(mockUser);
    mockRequest.body = { email: "test@test.com", password: "test" };

    await usersController.login(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "로그인에 성공했습니다.",
      data: mockUser
    });
  });

  test("getUserInfo Method", async () => {
    const mockUser = { id: 1, email: "test@test.com", name: "test" };
    mockUsersService.getUserInfo.mockResolvedValue(mockUser);
    mockResponse.locals = { user: { id: 1 } };

    await usersController.getUserInfo(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "사용자 정보 조회에 성공했습니다.",
      data: mockUser
    });
  });
});
