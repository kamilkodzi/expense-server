import { Request } from "express";

interface IGetUserAuthInfoRequest extends Request {
  user: any;
}

export default IGetUserAuthInfoRequest;
