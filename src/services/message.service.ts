import { localDataSource } from "../app-data-source";
import { Message } from "../models/message.entity";
import MessageDto from "../dto/message.dto";

const getAll = async () => {
  const messageRepository = localDataSource.getRepository(Message);
  return await messageRepository.find();
};

const create = async (message: MessageDto) => {
  const messageRepository = localDataSource.getRepository(Message);
  return await messageRepository.save(message);
};

const findOne = async (id: string) => {
  const messageRepository = localDataSource.getRepository(Message);
  return await messageRepository.find({
    where: {
      id: id,
    },
  });
};

const updateOne = async (id: string, message: MessageDto) => {
  const messageRepository = localDataSource.getRepository(Message);
  return await messageRepository.update(id, message);
};

const deleteOne = async (id: string) => {
  const messageRepository = localDataSource.getRepository(Message);
  return await messageRepository.delete(id);
};

export { getAll, create, findOne, updateOne, deleteOne };
