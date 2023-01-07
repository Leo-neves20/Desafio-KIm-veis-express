import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Users from "../../entities/user.entity";

const verifyIsActiveMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Users);

  const idParams = request.params.id;

  const isActive = await userRepository.findOneBy({
    id: idParams,
  });

  if (!isActive) {
    return response.status(404).json({ message: "user is disable" });
  }

  return next();
};

export default verifyIsActiveMiddleware;
