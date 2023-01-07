import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Users from "../../entities/user.entity";

const verifyUserIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Users);

  const id = req.params.id;

  const user = await userRepository.findOneBy({ id: id });

  if (!user) {
    return res.status(404).json({ message: "inavlid id" });
  } else if (!user.isActive) {
    return res.status(400).json({ message: "user is not active" });
  }

  return next();
};

export default verifyUserIdMiddleware;
