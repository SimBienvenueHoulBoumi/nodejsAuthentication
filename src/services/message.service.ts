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

export { getAll, create };
