import { localDataSource } from "../app-data-source";
import { User } from "../models/user.entity";
import UserDto from "../dto/user.dto";

import * as argon2 from "argon2";

const create = async (user: UserDto) => {
  const userRepository = localDataSource.getRepository(User);
  // Hasher le mot de passe avant de l'enregistrer dans la base de données
  const hashedPassword = await argon2.hash(user.password);

  return await userRepository.save({
    ...user,
    password: hashedPassword,
  });
};

const getOne = async (id: string) => {
  const userRepository = localDataSource.getRepository(User);

  return await userRepository.find({
    where: {
      id: id,
    },
  });
};

const findByUsernameAndPassword = async (
  username: string,
  password: string
) => {
  const userRepository = localDataSource.getRepository(User);
  try {
    const user = await userRepository.findOneBy({ username });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return null; // Utilisateur non trouvé
    }

    // Vérifier si le mot de passe fourni correspond au mot de passe hashé dans la base de données
    const passwordMatch = await argon2.verify(user.password, password);
    if (!passwordMatch) {
      return null; // Mot de passe incorrect
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatePassword = async (newPassword: string, id: string) => {
  const userRepository = localDataSource.getRepository(User);
  const hashedPassword = await argon2.hash(newPassword);

  const user = await userRepository.findOneBy({ id });
  if (!user) {
    return null;
  }

  userRepository.merge(user, { password: hashedPassword });
  return await userRepository.save(user);
};

const deleteUser = async (id: string) => {
  const userRepository = localDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    return null;
  }

  return await userRepository.delete(user);
};

export {
  create,
  getOne,
  updatePassword,
  findByUsernameAndPassword,
  deleteUser,
};
